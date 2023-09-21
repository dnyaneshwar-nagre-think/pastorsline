interface State {
  data: any[];
  page: number;
  isLoading: boolean;
}

type Action =
  | { type: "FETCH_DATA"; payload: any[] }
  | { type: "SET_LOADING"; isLoading: boolean };

export const initialState: State = {
  data: [],
  page: 1,
  isLoading: false,
};

export function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "FETCH_DATA":
      return {
        ...state,
        data: [...state.data, ...action.payload],
        page: state.page + 1,
        isLoading: false,
      };
    case "SET_LOADING":
      return {
        ...state,
        isLoading: action.isLoading,
      };
    default:
      return state;
  }
}
