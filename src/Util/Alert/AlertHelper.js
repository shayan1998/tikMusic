export class AlertHelper {
    static Alert;
    //static onClose;
  
    static setAlert(Alert) {
      	this.Alert = Alert;
    }
  
    static show(type,title,name,image,trueFun=null,falseFun=null) {
		if (this.Alert) {
			this.Alert.makeAlert(type,title,name,image,trueFun,falseFun);
		}
    }

    static close() {
		if (this.Alert) {
			this.Alert.removeAlert();
		}
    }
  
}