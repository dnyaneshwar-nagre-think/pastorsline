const initial_state = {
  SingleItem: "",
};

const SingleContactItemReducer = (state = initial_state, action: any) => {
  switch (action.type) {
    case "SINGLE_ITEM_CONTACT":
      return { ...state, SingleItem: action.payload };
    default:
      return state;
  }
};

export default SingleContactItemReducer;
