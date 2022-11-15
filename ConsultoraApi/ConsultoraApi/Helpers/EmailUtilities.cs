using ConsultoraApi.Models;
using System.Net;
using System.Net.Mail;
using System.Net.Security;
using System.Security.Cryptography.X509Certificates;

namespace ConsultoraApi.Helpers
{
    public class EmailUtilities
    {
        public EmailUtilities(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        public bool SendNewUserEmail(string pEmail, Usuario pUsuario)
        {
            //TODO Ver posibilidad de incluir el HTML del mensaje en un template que pueda ser obtenido como un recurso
            const string pSubject = "PatocchiPassera | Nueva cuenta de usuario";
            const string pBodyHtml =
                @"<html>
                        <head></head>
                        <body>
                            <p>{0} {1},<p>
                            <p>Le informamos que su cuenta de usuario ha sido creada exitosamente.<p>
                            <p>Sus datos de acceso son los siguientes:<p>
                            <p><b>Usuario:</b> {2}</p>
                            <p><b>Contraseña:</b> {3}</p>
                        </body>
                    </html>";

            return SendEmail(
                    pEmail,
                    pSubject,
                    string.Format(pBodyHtml, pUsuario.Nombre, pUsuario.Apellido, pUsuario.NombreUsuario, pUsuario.Password));
        }

        public bool SendChangeEstado(string pEmail, Candidato pCandidato)
        {
            //TODO Ver posibilidad de incluir el HTML del mensaje en un template que pueda ser obtenido como un recurso
            const string pSubject = "PatocchiPassera | Actualización de estado";
            string pBodyHtml = "";
            if (pCandidato.Estado == "Preseleccionado")
            {
                pBodyHtml =
               @"<html>
                        <head></head>
                        <body>
                            <p>Buen día {0} {1},<p>
                            <p>Le informamos que ha quedado preseleccionado a la posición postulada.<p>
                            <p>A la brevedad nos estaremos comunicando con usted para brindarle más detalles<p>
                        </body>
                    </html>";

            }else if (pCandidato.Estado=="En proceso")
            {
                pBodyHtml =
              @"<html>
                        <head></head>
                        <body>
                            <p>Buen día {0} {1},<p>
                            <p>Le informamos que ha quedado preseleccionado a la posición postulada.<p>
                            <p>A la brevedad nos estaremos comunicando con usted para brindarle más detalles<p>
                        </body>
                    </html>";
            }
            else if (pCandidato.Estado == "En base")
            {
                pBodyHtml =
              @"<html>
                        <head></head>
                        <body>
                            <p>Buen día {0} {1},<p>
                            <p>Le informamos que ha quedado preseleccionado a la posición postulada.<p>
                            <p>A la brevedad nos estaremos comunicando con usted para brindarle más detalles<p>
                        </body>
                    </html>";
            }
            else if (pCandidato.Estado == "Seleccionado")
            {
                pBodyHtml = @"<html>
                        <head></head>
                        <body>
                            <p>Buen día {0} {1},<p>
                            <p>Le informamos que ha quedado preseleccionado a la posición postulada.<p>
                            <p>A la brevedad nos estaremos comunicando con usted para brindarle más detalles<p>
                        </body>
                    </html>";
            }
            else if (pCandidato.Estado == "Descartado")
            {
                pBodyHtml = @"<html>
                        <head></head>
                        <body>
                            <p>Buen día {0} {1},<p>
                            <p>Le informamos que ha quedado preseleccionado a la posición postulada.<p>
                            <p>A la brevedad nos estaremos comunicando con usted para brindarle más detalles<p>
                        </body>
                    </html>";
            }
            return SendEmail(
                    pEmail,
                    pSubject,
                    string.Format(pBodyHtml, pCandidato.Nombre, pCandidato.Apellido));
        }

        private bool SendEmail(string pToEmail, string pSubject, string pBody)
        {
            try
            {
                string pFromEmail = Configuration.GetValue<string>("Keys:EmailAccount");
                string pFromPassword = Configuration.GetValue<string>("Keys:EmailPassword");
                string pPort = Configuration.GetValue<string>("Keys:EmailPort");
                bool pEnable = Configuration.GetValue<bool>("Keys:EnableSSL");
                string pUserEmail = Configuration.GetValue<string>("Keys:EmailUser");


                //TODO: estos seteos son importantes y obligatorios, sino estan se debe enviar un error
                int pEmailPort = (!string.IsNullOrEmpty(pPort)) ? Convert.ToInt32(pPort) : 587;

                var message = new MailMessage(pFromEmail, pToEmail, pSubject, pBody);
                message.IsBodyHtml = true;

                var smtp = new SmtpClient
                {
                    Host = Configuration.GetValue<string>("Keys:EmailSmtpServer"),
                    Port = pEmailPort,
                    EnableSsl = pEnable,
                    DeliveryMethod = SmtpDeliveryMethod.Network,
                    UseDefaultCredentials = false,
                    Credentials = new NetworkCredential(pUserEmail, pFromPassword)
                };

                //ServicePointManager.ServerCertificateValidationCallback = delegate (object s,
                //    System.Security.Cryptography.X509Certificates.X509Certificate certificate,
                //    X509Chain chain, SslPolicyErrors sslPolicyErrors)
                //{ return true; };

                smtp.Send(message);
                return true;
            }
            catch (Exception e)
            {
                return false;
            }
        }

    }
}
