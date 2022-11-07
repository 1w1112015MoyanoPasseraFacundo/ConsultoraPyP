using AutoMapper;
using ConsultoraApi.Dtos.DtosCandidatos;
using ConsultoraApi.Dtos.DtosCandXCompes;
using ConsultoraApi.Dtos.DtosCompetencias;
using ConsultoraApi.Models;
using ConsultoraApi.Repositorios.IRepositorios;
using System.Collections.Generic;

namespace ConsultoraApi.Repositorios
{
    public class CandidatoXCompetenciaRepositorio : ICandidatoXCompetenciaRepositorio
    {
        IMapper _mapper;
        ConsultoraPypContext db;
        public CandidatoXCompetenciaRepositorio(ConsultoraPypContext _db, IMapper mapper)
        {
            db = _db;
            _mapper = mapper;
        }
        public bool CreateCandXCompe(CandidatosXcompetencia candXCompe)
        {
            db.CandidatosXcompetencias.Add(candXCompe);
            return Save();
        }
        public List<CandidatosXcompetencia> GetCandXCompes(int idCandidato)
        {
            if (idCandidato != null)
            {
                return db.CandidatosXcompetencias.Where(u => u.IdCandidato == idCandidato).ToList();
            }
            else
            {
                return null;
            }
        }
        public List<CandidatosXcompetencia> GetCandsByIdCompes(int idCompetencia)
        {
            if (idCompetencia != null)
            {
                return db.CandidatosXcompetencias.Where(u => u.IdCompetencia == idCompetencia).ToList();
            }
            else
            {
                return null;
            }
        }
        public List<CandidatosXcompetencia> GetsCandsByIdCompes(List<int> idCompetencia)
        {
            if (idCompetencia != null)
            {
                var cand = db.CandidatosXcompetencias.Where(u => idCompetencia.Contains(u.IdCompetencia)).ToList();
                return cand; 
            }
            else
            {
                return null;
            }
        }
        public List<CandXCompeDto> GetCandByIdCompes(List<int> idsCompes)
        {
            var cand = db.CandidatosXcompetencias.ToList();
            var cand2 = db.CandidatosXcompetencias.ToList();
            var candi = new List<CandXCompeDto>();
            if (idsCompes.Count != 0)
            {
                for (int i = 0; i < idsCompes.Count; i++)
                {
                    if (candi.Count == 0)
                    {
                        cand = cand.Where(x => x.IdCompetencia == idsCompes[i]).ToList();
                        for (int j = 0; j < cand.Count; j++)
                        {
                            candi.Add(_mapper.Map<CandXCompeDto>(cand[j]));
                        }
                    }
                    else
                    {
                        cand2 = cand2.Where(x => x.IdCompetencia == idsCompes[i]).ToList();
                        if (cand2.Count == 0)
                        {
                            for (int h = 0; h < candi.Count; h++)
                            {
                                candi.Remove(_mapper.Map<CandXCompeDto>(candi[h]));
                            }
                        }
                        else
                        {
                            for (int y = 0; y < cand2.Count; y++)
                            {
                                if (cand.Count > y)
                                {
                                    if (cand[y].IdCandidato == cand2[y].IdCandidato)
                                    {
                                        candi.Add(_mapper.Map<CandXCompeDto>(cand[y]));
                                        for (int j = 0; j < cand.Count; j++)
                                        {
                                            candi.Add(_mapper.Map<CandXCompeDto>(cand[j]));
                                        }
                                    }
                                    else
                                    {
                                        for (int h = 0; h < candi.Count; h++)
                                        {
                                            candi.Remove(_mapper.Map<CandXCompeDto>(candi[h]));
                                        }
                                    }
                                }
                                else if (y > 0)
                                {
                                    if (cand[y - 1].IdCandidato == cand2[y].IdCandidato)
                                    {
                                        candi.Add(_mapper.Map<CandXCompeDto>(cand[y - 1]));
                                        for (int j = 0; j < cand.Count; j++)
                                        {
                                            candi.Add(_mapper.Map<CandXCompeDto>(cand[j]));
                                        }
                                    }
                                    else
                                    {
                                        for (int h = 0; h < candi.Count; h++)
                                        {
                                            candi.Remove(_mapper.Map<CandXCompeDto>(candi[h]));
                                        }
                                    }
                                }

                            }
                        }

                    }

                }
                return candi;
            }
            else
            {
                return null;
            }
        }

        public bool CandXCompeExists(int idCand, int idCompe)
        {
            return db.CandidatosXcompetencias.Any(x=>x.IdCandidato==idCand && x.IdCompetencia==idCompe);
        }
        public bool UpdateCandXCompe(CandidatosXcompetencia candXCompe)
        {
            db.CandidatosXcompetencias.Add(candXCompe);
            return Save();
        }
        public bool DeleteCandXCompe(CandidatosXcompetencia candXCompe)
        {
            db.CandidatosXcompetencias.Remove(candXCompe);
            return Save();
        }
        public bool Save()
        {
            try
            {
                return db.SaveChanges() > 0 ? true : false;
            }
            catch (Exception ex)
            {

                return false;
            }
        }
    }
}
