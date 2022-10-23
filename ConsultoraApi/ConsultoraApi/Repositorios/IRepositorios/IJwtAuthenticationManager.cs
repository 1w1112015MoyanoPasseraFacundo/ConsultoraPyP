namespace ConsultoraApi.Repositorios.IRepositorios
{
    public interface IJwtAuthenticationManager
    {
        public string Authenticate(string username, string password);
    }
}
