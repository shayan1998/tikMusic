export class NotifHelper {
    static Notif;
  
    static setNotif(Notif) {
      	this.Notif = Notif;
    }
  
    static show(type,title,message,duration=0) {
		if (this.Notif) {
			this.Notif.makeNotif(type,title,message,duration);
		}
    }

    static close() {
		if (this.Notif) {
			this.Notif.removeNotif();
		}
    }
}