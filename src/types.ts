export interface ProductType {
	id: number;
	title: string;
	price: number;
	image: string;
	total: number;
	description?: string;
}

export interface ProductsState {
	products: ProductType[];
	loading: "loading" | "success" | "failed" | "idle";
}

export interface CartState {
	cartItem: ProductType[];
	TotalItems: number;
}
