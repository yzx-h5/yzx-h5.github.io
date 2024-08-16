import service from '../../utils/axios';

export const queryAllProduct = async (params: any) => {
  try {
    const data = await service.post('/product/findAll', params);
    return data;
  } catch (error) {
    console.error('Product query:', error);
    throw error;
  }
};