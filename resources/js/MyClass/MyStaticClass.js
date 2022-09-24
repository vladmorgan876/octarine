
import axios from "axios";
export class MyStaticClass {

  static Helper(path,obj){
          axios.post(path,obj)
              .then((response) => {
                      debugger;
                      var message = response.data.message;
                      if (message=="All right"){
                          alert("Уважаемый "+obj.messageFrom+" ваше сообщение доставлено");
                         // window.location.href = "/";
                      }
                  }
             )
  }
}
