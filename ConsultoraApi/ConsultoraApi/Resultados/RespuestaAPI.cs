namespace ConsultoraApi.Resultados
{
    public class RespuestaAPI
    {
        public bool Ok { get; set; }

        public string Error { get; set; }

        public string InfoAdicional { get; set; }

        public object Respuesta { get; set; }
    }
}
