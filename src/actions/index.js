
export const addToCart = (id) => {
  return function action(dispatch) {
    dispatch({
      type: 'product',
      payload: id
    })
  }
}