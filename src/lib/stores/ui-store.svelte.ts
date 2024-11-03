function createSidebarStore() {
	let openState = $state(true);

	return {
		get sidebarOpen() {
			return openState;
		},
		toggleOpen: () => {
			openState = !openState;
		}
	};
}
export const sidebarStore = createSidebarStore();
