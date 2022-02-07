export interface ProductType {
	id: string;
	title: string;
	price: number;
	image: string;
	total: number;
	description?: string;
	disabled: boolean;
}

export interface fireStoreProductType {
	id: string;
	title: string;
	description: string;
	image: string;
	disabled: boolean;
	price: number;
	total: number;
	createdAt?: string;
}

export interface User {
	userEmail: string | null;
	photoURL: string | null;
	displayName: string | null;
}

export interface ProductsState {
	products: fireStoreProductType[];
	loading: "loading" | "success" | "failed" | "idle";
	isReloadItems: boolean;
	userObj: User;
}

export interface CartState {
	cartItem: ProductType[];
	TotalItems: number;
	TotalPrice: number;
}
