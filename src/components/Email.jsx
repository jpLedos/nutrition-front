import React from 'react'
import { Fragment } from 'react'


const Email = () => {

    const validateForm = () =>                                 
    { 
        let formOk= true;

        const contact = document.getElementById("contact");
        const email = document.getElementById("email");
        const tel = document.getElementById("tel");     
        const subject = document.getElementById("subject");       
        const message = document.getElementById("message");
                
        if (contact.value === ""){ 
            document.getElementById('errorContact').innerHTML="Veuillez entrez un nom valide";  
            contact.focus(); 
            formOk= false; 
        }else{
            document.getElementById('errorContact').innerHTML="";  
        }

        if  (!email.value.match(/[a-z0-9_\-\.]+@[a-z0-9_\-\.]+\.[a-z]+/i)){ 
            document.getElementById('errorEmail').innerHTML="Veuillez entrez un email valide";  
            email.focus(); 
            formOk =  false; 
        }else{
            document.getElementById('errorEmail').innerHTML="";  
        }

        if (!tel.value.match( /^0[1-6]\d{8}$/) ){ 
            document.getElementById('errorTel').innerHTML="Veuillez entrez un telephone valide";  
            tel.focus(); 
            formOk = false;
        }else{
            document.getElementById('errorTel').innerHTML="";  
        }

        if (subject.value === ""){ 
            document.getElementById('errorSubject').innerHTML="Merci de preciser le sujet de votre demande";  
            contact.focus(); 
            formOk= false; 
        }else{
            document.getElementById('errorSubject').innerHTML="";  
        }

        if (message.value === ""){ 
            document.getElementById('errorMessage').innerHTML="Veuillez entrez un message";  
            message.focus(); 
            formOk = false; 
        }else{
            document.getElementById('errorMessage').innerHTML="";  
        }

        return formOk;
    }


    const handleSubmit =(e) => {
        e.preventDefault();
        if(validateForm()) {

            const contact = document.getElementById("contact").value;
            const email = document.getElementById("email").value;
            const tel = document.getElementById("tel").value;        
            const subject = document.getElementById("subject").value;  
            const message = document.getElementById("message").value;

            const apiSuccess = document.getElementById("apiSuccess")
            const apiError = document.getElementById("apiError")

            const payload = {
                contact,
                email, 
                tel,
                subject,
                message,
            }
         
            const url =`https://127.0.0.1:8000/api/emails`;
            //console.log("post : " + url);
            console.log(JSON.stringify({payload}));
            fetch(url,{
                method : "POST" ,
                headers : {
                    "content-type" : "application/json",
                },
                body : JSON.stringify(payload),
            })
            .then(response => {
                //console.log(response);
                if(response.ok){
                        document.forms['contact'].reset();
                        apiSuccess.innerHTML="Merci pour votre message qui a bien ??t?? envoy?? !"
                        apiError.innerHTML=""

                } else {
                    apiSuccess.innerHTML=""
                    apiError.innerHTML="Une erreur est survenue lors de l envoi du message !"
                };
            })
        }

    }


  return (

    <Fragment>
            <h2>Envoyer votre message</h2>
            <div className="msg">
                <p className="msgSuccess" id="apiSuccess"></p>
                <p className="msgError" id="apiError"></p>
            </div>
            <form name="contact" action="https://formspree.io/f/mjvlgznz" encType="multipart/form-data" method='POST'>
                <div>
                    <input type="text" id="contact" name="contact" required aria-required="true" className="form-control" placeholder="Nom et pr??nom"/>
                    <span className="msgError" id="errorContact"></span>
                </div>
                <div>
                    <input type="email" id="email" name="email" required aria-required="true" className="form-control" placeholder="Votre Email"/>  
                    <span className="msgError" id="errorEmail"></span>
                </div>
                <div>
                    <input type="tel" id="tel" name ="tel" required aria-required="true" className="form-control" placeholder="Votre t??l??phone"/>
                    <span className="msgError" id="errorTel"></span>
                </div>

                <div>
                    <input type="text" id="subject" name ="subject" required aria-required="true" className="form-control" placeholder="Sujet de votre demande"/>
                    <span className="msgError" id="errorSubject"></span>
                </div>

                <div>
                    <textarea name="message" id="message" required aria-required="true" className="form-control" cols="60" rows="8" placeholder="Votre message"></textarea>
                    <span className="msgError" id="errorMessage"></span>
                </div>
                <div><button onClick= {handleSubmit}  type="submit" className="btn-contact btn-primary ">Envoyer le message</button></div>   
            </form>
    </Fragment>
  )
}

export default Email