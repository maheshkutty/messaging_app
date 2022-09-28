import {
	createContext,
	useReducer,
} from "react";

export const CustReqContext = createContext();

export const CustReqContextProvider = ({ children }) => {
	const INITIAL_STATE = [];

	const reqReducer = (state, action) => {
		switch (action.type) {
			case "CHANGE_REQ":
				return action.payload;
			default:
				return state;
		}
	};

	const [state, dispatch] = useReducer(reqReducer, INITIAL_STATE);

	return (
		<CustReqContext.Provider value={{ data: state, dispatch }}>
			{children}
		</CustReqContext.Provider>
	);
};
