using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace ConsultoraApi.Models
{
    public partial class ConsultoraPypContext : DbContext
    {
        public ConsultoraPypContext()
        {
        }

        public ConsultoraPypContext(DbContextOptions<ConsultoraPypContext> options)
            : base(options)
        {

        }

        public virtual DbSet<Candidato> Candidatos { get; set; } = null!;
        public virtual DbSet<CandidatosXcompetencia> CandidatosXcompetencias { get; set; } = null!;
        public virtual DbSet<Cliente> Clientes { get; set; } = null!;
        public virtual DbSet<Competencia> Competencias { get; set; } = null!;
        public virtual DbSet<Empleo> Empleos { get; set; } = null!;
        public virtual DbSet<EmpleosXcompetencia> EmpleosXcompetencias { get; set; } = null!;
        public virtual DbSet<Estado> Estados { get; set; } = null!;
        public virtual DbSet<Genero> Generos { get; set; } = null!;
        public virtual DbSet<Pago> Pagos { get; set; } = null!;
        public virtual DbSet<Paise> Paises { get; set; } = null!;
        public virtual DbSet<Role> Roles { get; set; } = null!;
        public virtual DbSet<Rubro> Rubros { get; set; } = null!;
        public virtual DbSet<TiposDocumento> TiposDocumentos { get; set; } = null!;
        public virtual DbSet<Usuario> Usuarios { get; set; } = null!;
        public virtual DbSet<UsuariosXrole> UsuariosXroles { get; set; } = null!;

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {

                optionsBuilder.UseSqlServer("Server=DESKTOP-VVK62F7; Database=ConsultoraPyp; Trusted_Connection=True;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Candidato>(entity =>
            {
                entity.HasKey(e => e.IdCandidato)
                    .HasName("Candidatos_pk");

                entity.Property(e => e.IdCandidato).HasColumnName("idCandidato");

                entity.Property(e => e.Apellido)
                    .HasMaxLength(100)
                    .IsUnicode(false)
                    .HasColumnName("apellido");

                entity.Property(e => e.Documento).HasColumnName("documento");

                entity.Property(e => e.EstadoCivil).HasColumnName("estadoCivil");

                entity.Property(e => e.FechaNacimiento)
                    .HasColumnType("datetime")
                    .HasColumnName("fechaNacimiento");

                entity.Property(e => e.IdEstado).HasColumnName("idEstado");

                entity.Property(e => e.IdGenero).HasColumnName("idGenero");

                entity.Property(e => e.IdPais).HasColumnName("idPais");

                entity.Property(e => e.IdRubro).HasColumnName("idRubro");

                entity.Property(e => e.IdTipoDocumento).HasColumnName("idTipoDocumento");

                entity.Property(e => e.Linkedin)
                    .HasMaxLength(100)
                    .IsUnicode(false)
                    .HasColumnName("linkedin");

                entity.Property(e => e.Mail)
                    .HasMaxLength(100)
                    .IsUnicode(false)
                    .HasColumnName("mail");

                entity.Property(e => e.Nombre)
                    .HasMaxLength(100)
                    .IsUnicode(false)
                    .HasColumnName("nombre");

                entity.Property(e => e.Estado).HasMaxLength(50)
                    .IsUnicode(false).HasColumnName("estado");

                entity.Property(e => e.Telefono).HasMaxLength(20)
                    .IsUnicode(false).HasColumnName("telefono");

                entity.HasOne(d => d.IdEstadoNavigation)
                    .WithMany(p => p.Candidatos)
                    .HasForeignKey(d => d.IdEstado)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("Candidatos_Estados");

                entity.HasOne(d => d.IdGeneroNavigation)
                    .WithMany(p => p.Candidatos)
                    .HasForeignKey(d => d.IdGenero)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("Candidatos_Generos");

                entity.HasOne(d => d.IdPaisNavigation)
                    .WithMany(p => p.Candidatos)
                    .HasForeignKey(d => d.IdPais)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("Candidatos_Paises");

                entity.HasOne(d => d.IdRubroNavigation)
                    .WithMany(p => p.Candidatos)
                    .HasForeignKey(d => d.IdRubro)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("Candidatos_Rubros");

                entity.HasOne(d => d.IdTipoDocumentoNavigation)
                    .WithMany(p => p.Candidatos)
                    .HasForeignKey(d => d.IdTipoDocumento)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("Candidatos_TiposDocumento");
            });

            modelBuilder.Entity<CandidatosXcompetencia>(entity =>
            {
                entity.HasKey(e => e.IdCandidatoXcompetencia)
                    .HasName("CandidatosXCompetencias_pk");

                entity.ToTable("CandidatosXCompetencias");

                entity.Property(e => e.IdCandidatoXcompetencia).HasColumnName("idCandidatoXCompetencia");

                entity.Property(e => e.IdCandidato).HasColumnName("idCandidato");

                entity.Property(e => e.IdCompetencia).HasColumnName("idCompetencia");

                entity.HasOne(d => d.IdCandidatoNavigation)
                    .WithMany(p => p.CandidatosXcompetencia)
                    .HasForeignKey(d => d.IdCandidato)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("CandidatosXCompetencias_Candidatos");

                entity.HasOne(d => d.IdCompetenciaNavigation)
                    .WithMany(p => p.CandidatosXcompetencia)
                    .HasForeignKey(d => d.IdCompetencia)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("CandidatosXCompetencias_Competencias");
            });

            modelBuilder.Entity<Cliente>(entity =>
            {
                entity.HasKey(e => e.IdCliente)
                    .HasName("Clientes_pk");

                entity.Property(e => e.IdCliente).HasColumnName("idCliente");

                entity.Property(e => e.Direccion)
                    .HasMaxLength(100)
                    .IsUnicode(false)
                    .HasColumnName("direccion");

                entity.Property(e => e.Documento).HasColumnName("documento");

                entity.Property(e => e.FechaAlta)
                    .HasColumnType("datetime")
                    .HasColumnName("fechaAlta");

                entity.Property(e => e.IdEstado).HasColumnName("idEstado");

                entity.Property(e => e.IdGenero).HasColumnName("idGenero");

                entity.Property(e => e.IdPais).HasColumnName("idPais");

                entity.Property(e => e.IdRubro).HasColumnName("idRubro");

                entity.Property(e => e.IdTipoDocumento).HasColumnName("idTipoDocumento");

                entity.Property(e => e.Mail)
                    .HasMaxLength(100)
                    .IsUnicode(false)
                    .HasColumnName("mail");

                entity.Property(e => e.Nombre)
                    .HasMaxLength(100)
                    .IsUnicode(false)
                    .HasColumnName("nombre");

                entity.Property(e => e.NombreFantasia)
                    .HasMaxLength(100)
                    .IsUnicode(false)
                    .HasColumnName("nombreFantasia");

                entity.Property(e => e.RazonSocial)
                    .HasMaxLength(100)
                    .IsUnicode(false)
                    .HasColumnName("razonSocial");

                entity.Property(e => e.Telefono).HasMaxLength(50)
                    .IsUnicode(false).HasColumnName("telefono");

                entity.HasOne(d => d.IdEstadoNavigation)
                    .WithMany(p => p.Clientes)
                    .HasForeignKey(d => d.IdEstado)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("Clientes_Estados");

                entity.HasOne(d => d.IdGeneroNavigation)
                    .WithMany(p => p.Clientes)
                    .HasForeignKey(d => d.IdGenero)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("Clientes_Generos");

                entity.HasOne(d => d.IdPaisNavigation)
                    .WithMany(p => p.Clientes)
                    .HasForeignKey(d => d.IdPais)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("Clientes_Paises");

                entity.HasOne(d => d.IdRubroNavigation)
                    .WithMany(p => p.Clientes)
                    .HasForeignKey(d => d.IdRubro)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("Clientes_Rubros");

                entity.HasOne(d => d.IdTipoDocumentoNavigation)
                    .WithMany(p => p.Clientes)
                    .HasForeignKey(d => d.IdTipoDocumento)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("Clientes_TiposDocumento");
            });

            modelBuilder.Entity<Competencia>(entity =>
            {
                entity.HasKey(e => e.IdCompetencia)
                    .HasName("Competencias_pk");

                entity.Property(e => e.IdCompetencia).HasColumnName("idCompetencia");

                entity.Property(e => e.FinVigencia)
                    .HasColumnType("datetime")
                    .HasColumnName("finVigencia");

                entity.Property(e => e.IdRubro).HasColumnName("idRubro");

                entity.Property(e => e.InicioVigencia)
                    .HasColumnType("datetime")
                    .HasColumnName("inicioVigencia");

                entity.Property(e => e.Nombre)
                    .HasMaxLength(100)
                    .IsUnicode(false)
                    .HasColumnName("nombre");

                entity.HasOne(d => d.IdRubroNavigation)
                    .WithMany(p => p.Competencia)
                    .HasForeignKey(d => d.IdRubro)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("Competencias_Rubros");
            });

            modelBuilder.Entity<Empleo>(entity =>
            {
                entity.HasKey(e => e.IdEmpleo)
                    .HasName("Empleos_pk");

                entity.Property(e => e.IdEmpleo).HasColumnName("idEmpleo");

                entity.Property(e => e.FechaAlta)
                    .HasColumnType("datetime")
                    .HasColumnName("fechaAlta");

                entity.Property(e => e.IdCliente).HasColumnName("idCliente");

                entity.Property(e => e.IdEstado).HasColumnName("idEstado");

                entity.Property(e => e.IdRubro).HasColumnName("idRubro");

                entity.Property(e => e.Modalidad).HasMaxLength(50)
                    .IsUnicode(false).HasColumnName("modalidad");

                entity.Property(e => e.Nombre)
                    .HasMaxLength(100)
                    .IsUnicode(false)
                    .HasColumnName("nombre");


                entity.HasOne(d => d.IdClienteNavigation)
                    .WithMany(p => p.Empleos)
                    .HasForeignKey(d => d.IdCliente)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("Empleos_Clientes");

                entity.HasOne(d => d.IdEstadoNavigation)
                    .WithMany(p => p.Empleos)
                    .HasForeignKey(d => d.IdEstado)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("Empleos_Estados");

                entity.HasOne(d => d.IdRubroNavigation)
                    .WithMany(p => p.Empleos)
                    .HasForeignKey(d => d.IdRubro)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("Empleos_Rubros");
            });

            modelBuilder.Entity<EmpleosXcompetencia>(entity =>
            {
                entity.HasKey(e => e.IdEmpleoXcompetencia)
                    .HasName("EmpleosXCompetencias_pk");

                entity.ToTable("EmpleosXCompetencias");

                entity.Property(e => e.IdEmpleoXcompetencia).HasColumnName("idEmpleoXCompetencia");

                entity.Property(e => e.IdCompetencia).HasColumnName("idCompetencia");

                entity.Property(e => e.IdEmpleo).HasColumnName("idEmpleo");

                entity.HasOne(d => d.IdCompetenciaNavigation)
                    .WithMany(p => p.EmpleosXcompetencia)
                    .HasForeignKey(d => d.IdCompetencia)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("EmpleosXCompetencias_Competencias");

                entity.HasOne(d => d.IdEmpleoNavigation)
                    .WithMany(p => p.EmpleosXcompetencia)
                    .HasForeignKey(d => d.IdEmpleo)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("EmpleosXCompetencias_Empleos");
            });

            modelBuilder.Entity<Estado>(entity =>
            {
                entity.HasKey(e => e.IdEstado)
                    .HasName("Estados_pk");

                entity.Property(e => e.IdEstado).HasColumnName("idEstado");

                entity.Property(e => e.Nombre)
                    .HasMaxLength(100)
                    .IsUnicode(false)
                    .HasColumnName("nombre");
            });

            modelBuilder.Entity<Genero>(entity =>
            {
                entity.HasKey(e => e.IdGenero)
                    .HasName("PK_GENEROS");

                entity.Property(e => e.IdGenero).HasColumnName("idGenero");

                entity.Property(e => e.Nombre)
                    .HasMaxLength(100)
                    .IsUnicode(false)
                    .HasColumnName("nombre");
            });

            modelBuilder.Entity<Pago>(entity =>
            {
                entity.HasKey(e => e.IdPago)
                    .HasName("Pagos_pk");

                entity.Property(e => e.IdPago).HasColumnName("idPago");

                entity.Property(e => e.Estado).HasColumnName("estado");

                entity.Property(e => e.FechaPago)
                    .HasColumnType("datetime")
                    .HasColumnName("fechaPago");

                entity.Property(e => e.IdCliente).HasColumnName("idCliente");
                entity.Property(e => e.IdEmpleo).HasColumnName("idEmpleo");

                entity.Property(e => e.MontoPago).HasColumnName("montoPago");

                entity.HasOne(d => d.IdClienteNavigation)
                    .WithMany(p => p.Pagos)
                    .HasForeignKey(d => d.IdCliente)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("Pagos_Clientes");

                entity.HasOne(d => d.IdEmpleoNavigation)
                    .WithMany(p => p.Pagos)
                    .HasForeignKey(d => d.IdEmpleo)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("Pagos_Empleos");
            });

            modelBuilder.Entity<Paise>(entity =>
            {
                entity.HasKey(e => e.IdPais)
                    .HasName("PK_PAISES");

                entity.Property(e => e.IdPais).HasColumnName("idPais");

                entity.Property(e => e.Nombre)
                    .HasMaxLength(100)
                    .IsUnicode(false)
                    .HasColumnName("nombre");
            });

            modelBuilder.Entity<Role>(entity =>
            {
                entity.HasKey(e => e.IdRol)
                    .HasName("PK_ROLES");

                entity.Property(e => e.IdRol).HasColumnName("idRol");

                entity.Property(e => e.Nombre)
                    .HasMaxLength(100)
                    .IsUnicode(false)
                    .HasColumnName("nombre");
            });

            modelBuilder.Entity<Rubro>(entity =>
            {
                entity.HasKey(e => e.IdRubro)
                    .HasName("PK_RUBROS");

                entity.Property(e => e.IdRubro).HasColumnName("idRubro");

                entity.Property(e => e.Nombre)
                    .HasMaxLength(100)
                    .IsUnicode(false)
                    .HasColumnName("nombre");
            });

            modelBuilder.Entity<TiposDocumento>(entity =>
            {
                entity.HasKey(e => e.IdTipoDocumento)
                    .HasName("PK_TIPOSDOCUMENTO");

                entity.ToTable("TiposDocumento");

                entity.Property(e => e.IdTipoDocumento).HasColumnName("idTipoDocumento");

                entity.Property(e => e.Nombre)
                    .HasMaxLength(100)
                    .IsUnicode(false)
                    .HasColumnName("nombre");
            });

            modelBuilder.Entity<Usuario>(entity =>
            {
                entity.HasKey(e => e.IdUsuario)
                    .HasName("Usuarios_pk");

                entity.Property(e => e.IdUsuario).HasColumnName("idUsuario");

                entity.Property(e => e.Apellido)
                    .HasMaxLength(100)
                    .IsUnicode(false)
                    .HasColumnName("apellido");

                entity.Property(e => e.Cuil).HasMaxLength(50).IsUnicode(false).HasColumnName("cuil");

                entity.Property(e => e.Direccion)
                    .HasMaxLength(100)
                    .IsUnicode(false)
                    .HasColumnName("direccion");

                entity.Property(e => e.Documento).HasColumnName("documento");

                entity.Property(e => e.FechaAlta)
                    .HasColumnType("datetime")
                    .HasColumnName("fechaAlta");

                entity.Property(e => e.FechaNacimiento)
                    .HasColumnType("datetime")
                    .HasColumnName("fechaNacimiento");

                entity.Property(e => e.FechaSalida)
                    .HasColumnType("datetime")
                    .HasColumnName("fechaSalida");

                entity.Property(e => e.IdGenero).HasColumnName("idGenero");

                entity.Property(e => e.IdTipoDocumento).HasColumnName("idTipoDocumento");

                entity.Property(e => e.Mail)
                    .HasMaxLength(100)
                    .IsUnicode(false)
                    .HasColumnName("mail");

                entity.Property(e => e.Nombre)
                    .HasMaxLength(100)
                    .IsUnicode(false)
                    .HasColumnName("nombre");

                entity.Property(e => e.NombreUsuario)
                    .HasMaxLength(100)
                    .IsUnicode(false)
                    .HasColumnName("nombreUsuario");

                entity.Property(e => e.Password)
                    .HasMaxLength(100)
                    .IsUnicode(false)
                    .HasColumnName("password");

                entity.Property(e => e.Telefono).HasMaxLength(20)
                    .IsUnicode(false).HasColumnName("telefono");

                entity.HasOne(d => d.IdGeneroNavigation)
                    .WithMany(p => p.Usuarios)
                    .HasForeignKey(d => d.IdGenero)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("Usuarios_Generos");

                entity.HasOne(d => d.IdTipoDocumentoNavigation)
                    .WithMany(p => p.Usuarios)
                    .HasForeignKey(d => d.IdTipoDocumento)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("Usuarios_TiposDocumento");
            });

            modelBuilder.Entity<UsuariosXrole>(entity =>
            {
                entity.HasKey(e => e.IdUsuarioXrol)
                    .HasName("UsuariosXRoles_pk");

                entity.ToTable("UsuariosXRoles");

                entity.Property(e => e.IdUsuarioXrol).HasColumnName("idUsuarioXRol");

                entity.Property(e => e.IdRol).HasColumnName("idRol");

                entity.Property(e => e.IdUsuario).HasColumnName("idUsuario");

                entity.HasOne(d => d.IdRolNavigation)
                    .WithMany(p => p.UsuariosXroles)
                    .HasForeignKey(d => d.IdRol)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("UsuariosXRoles_Roles");

                entity.HasOne(d => d.IdUsuarioNavigation)
                    .WithMany(p => p.UsuariosXroles)
                    .HasForeignKey(d => d.IdUsuario)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("UsuariosXRoles_Usuarios");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
