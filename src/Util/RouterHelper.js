export class RouterHelper {
    static router; 
  
    static setRouter(router) {
		this.router = router;
	}
    static FullPlayer() {
		if (this.router) {
			this.router._navigation.navigate('FullPlayer');
		}
	}


}