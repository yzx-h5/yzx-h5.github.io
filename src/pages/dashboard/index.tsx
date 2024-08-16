import React, { useEffect, useState } from 'react';
import {
  IonContent,
  IonHeader,
  IonButtons,
  IonPage,
  IonTitle,
  IonToolbar,
  IonImg,
  IonMenu,
  IonIcon,
  IonFooter,
  IonText
} from '@ionic/react';
import { exitOutline } from 'ionicons/icons';
import { useLoading } from '@/hooks/loading-hook';
import { useAlert } from '@/hooks/alert-hook';
import { connect } from 'react-redux';
import { queryAllProduct } from '@/api/products';
import { logout } from '@/api/login';
import { mapStateToProps, setToken, setUserInfo } from '@/redux/actions';
import { menuController } from '@ionic/core/components';
import ProductCard from '@/components/product-card';
import {
  Tech,
  StarsCanvas,
} from "@/components";
import { useHistory } from 'react-router-dom';
import store from '@/redux/store';
import config from '@/config';
import { get } from 'lodash';
import './index.scss';

const Dashboard: React.FC<any> = (props) => {
  const { startLoading, stopLoading } = useLoading();
  const { showAlert } = useAlert();
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [isData, setIsData] = useState(true);
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const history = useHistory();

  useEffect(() => {
    const fetchData = async () => {
      const res = await getProducts({ page, pageSize });
      setProducts(res.products);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const handleScroll = async () => {
      const container = containerRef.current;
      if (!container) return;
      // 判断是否到达容器底部
      const isAtBottom = container.scrollTop + container.clientHeight >= container.scrollHeight;
      if (isAtBottom && !loading) {
        if (!isData) return;
        await setPage(page + 1);
      }
    };
    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => {
        container.removeEventListener('scroll', handleScroll);
      };
    }
    
  }, [loading, isData]);

  useEffect(() => {
    fetchData();
  }, [page]);

  const fetchData = async () => {
    try {
      if (!isData) return;
      setLoading(true);
      const res = await getProducts({ page, pageSize });
      if (!get(res, 'products')) return
      if (res.products.length < res.pageSize) {
        setIsData(false);
      }
      setProducts([...products, ...res.products]);
    } catch (ex: any) {
      showAlert(get(ex, 'response.data.message', ex));
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  async function handleLoginOut () {
    try {
      await startLoading();
      const res: any = await logout();
      const statusCode = get(res, 'statusCode');
      if (statusCode === 200) {
        setToken('');
        setUserInfo({});
        stopLoading();
        history.push('/');
        await menuController.close('first-menu')
        return
      }
      throw new Error(res.errors);
    } catch (ex: any) {
      showAlert(get(ex, 'response.data.message', ex));
      stopLoading();
    } finally {
      stopLoading();
    }
  }

  const getProducts = async ({ page = 1, pageSize = 1, sortBy = 'pid', sortOrder = 'asc' }): Promise<any> => {
    try {
      await startLoading();
      const res = await queryAllProduct({
        page,
        pageSize,
        sortBy,
        sortOrder
      });
      return res.data;
    } catch (ex: any) {
      showAlert(get(ex, 'response.data.message', ex));
      stopLoading();
      return [];
    } finally {
      stopLoading();
    }
  };

  const getImageUrl = (thumbnail: string) => {
    const token = store.getState().token;
    return `${config.baseURL}/file/get?docId=${thumbnail}&token=${token}`;
  };

  return (
    <>
      <IonMenu
        menuId="first-menu"
        contentId="main-content"
        side="end"
      >
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="end">
            </IonButtons>
            <IonTitle>
              天命人
            </IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
         <Tech />
        </IonContent>
        <IonFooter>
          <div className='menu-item' onClick={ handleLoginOut }>
            <IonIcon slot="icon-only" ios={ exitOutline } md={ exitOutline }></IonIcon>
            <span>Log out</span>
          </div>
        </IonFooter>
      </IonMenu>
      <IonPage id="main-content">
        <IonHeader>
          <IonToolbar>
            <div>
            </div>
            <div className='user-info-box'  onClick={ async () => { await menuController.open('first-menu') } } slot="end">
              <IonImg
                className='user-avatar'
                src={ getImageUrl(props.userInfo.avatar) }
                alt={ props.userInfo.realName }
              >
              </IonImg>
              <IonText class='user-name'>{ props.userInfo.realName}</IonText>
            </div>


          </IonToolbar>
        </IonHeader>

        <IonContent fullscreen>
        <div className="background-container">
         <StarsCanvas />
        </div>
          <div
            ref={ containerRef }
            className="loading"
            style={ { height: '100%', overflowY: 'auto', border: '1px solid #ccc' } }
          >
            <ul className='products-ul'>
              { products && products.length > 0 ? (
                products.map((item: any, index) => (
                  <ProductCard
                   product={ item }
                    key={ index }></ProductCard>
                ))
              ) : (
                <span>No products available</span>
              ) }
            </ul>
          </div>
        </IonContent>
      </IonPage>
    </>
  );
};

export default connect(mapStateToProps, { setToken, setUserInfo })(Dashboard);
