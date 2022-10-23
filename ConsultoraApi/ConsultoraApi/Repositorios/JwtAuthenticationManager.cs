﻿using ConsultoraApi.Models;
using ConsultoraApi.Repositorios.IRepositorios;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace ConsultoraApi.Repositorios
{
    public class JwtAuthenticationManager : IJwtAuthenticationManager
    {
        private readonly string key;
        private readonly ConsultoraPypContext db = new ConsultoraPypContext();


        public JwtAuthenticationManager(string key)
        {
            this.key = key;
        }

        public string Authenticate(string username, string password)
        {
            var users = db.Usuarios.ToList();
            if (!users.Any(u => u.NombreUsuario == username && u.Password == password))
            {
                return null;
            }

            var tokenHandler = new JwtSecurityTokenHandler();
            var tokenKey = Encoding.ASCII.GetBytes(key);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                    {
                        new Claim(ClaimTypes.Name, username)
                    }),
                Expires = DateTime.UtcNow.AddHours(1),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(tokenKey), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);

        }
    }
}
