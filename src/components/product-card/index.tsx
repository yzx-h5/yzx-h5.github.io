import React from 'react';
import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonButton
} from '@ionic/react';
import './index.scss';
import store from '@/redux/store';
import config from '@/config';

const ProductCard: React.FC<any> = ({
  product,
 }) => {

  const getImageUrl = (thumbnail: string) => {
    const token = store.getState().token;
    return `${config.baseURL}/file/get?docId=${thumbnail}&token=${token}`;
  };

  return (
    <IonCard className='product-card' key={ product.pid }>
      <img alt={ product.productName } src={ product.thumbnail } />
      <IonCardHeader>
        <IonCardSubtitle>{ product.createdTime }</IonCardSubtitle>
        <IonCardTitle>{ product.productName }</IonCardTitle>
      </IonCardHeader>
      { false && (
        <IonCardContent>
          <IonButton className='card-btn quote' fill="clear">报价</IonButton>
          <IonButton className='card-btn edit' fill="clear">编辑</IonButton>
          <IonButton className='card-btn delete' fill="clear">删除</IonButton>
        </IonCardContent>
      ) }
    </IonCard>
  );
};

export default ProductCard;
