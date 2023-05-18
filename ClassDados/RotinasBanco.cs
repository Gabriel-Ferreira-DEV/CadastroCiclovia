using System;
using System.Collections.Generic;
using System.Text;
using System.Data.SqlClient;
using System.Data;

namespace ClassDados
{
    public class RotinasBanco
    {
        private string connectionServer = "";


        public bool teste = false;
        //!Função: Propriedade para obteção erro durante execução das funções
        //!@return string: Erre resgatado do catch
        private string _sError;
        public string SError
        {
            get { return _sError; }
        }

        //!Função: Propriedade Sql Conection String
        //!@return string: Conection String
        private string ConnectionString = null;
        public string sqlConnectionString
        {
            get
            {
                return ConnectionString;
            }
            set
            {
                ConnectionString = value;
            }
        }

        //!Função: Propriedade Sql Conection String banco Segurança
        //!@return string: Conection String Para banco Segurança
        private string ConnectionStringSeq = null;
        public string sqlConnectionStringSeg
        {
            get
            {
                return ConnectionStringSeq;
            }
            set
            {
                ConnectionStringSeq = value;
            }
        }


        public RotinasBanco()
        {

        }

        //!ControlaTran: Rotina de Execução de Procedure
        //!@param nTipo: Transacional  = 0 -Begin Tran, 1-Commit, 2-Rollback
        //!@param connection: Conection passado por referência
        //!@return bool: Retorna o True/False da Execução
        /// <summary>
        /// Rotina de Execução de Procedure
        /// </summary>
        /// <param name="Procdr">Tipo Tran</param>
        /// <param name="param">connection</param>
        /// <returns>Retorna o True/False da Execução</returns>
        public bool ControlaTran(int nTipo, ref SqlConnection connection)
        {
            bool RstExec = false;
            System.Globalization.CultureInfo BR = new System.Globalization.CultureInfo("pt-BR");
            try
            {
                _sError = null;
                String queryString = "";
                if (nTipo == 0) queryString = "Begin Tran";
                if (nTipo == 1) queryString = "Commit";
                if (nTipo == 2) queryString = "Rollback";
                SqlCommand sqlcommand = new SqlCommand(queryString, connection);
                System.Data.SqlClient.SqlDataAdapter dataAdapter = new System.Data.SqlClient.SqlDataAdapter(sqlcommand);
                dataAdapter.SelectCommand.ExecuteNonQuery().ToString();
                RstExec = true;
            }
            catch (Exception exp)
            {
                _sError = sTrataError(exp.ToString());
                RstExec = false;
            }
            return RstExec;
        }

        //!ExecmdProc: Rotina de Execução de Procedure
        //!@param Procdr: Procedure
        //!@param param: parametro
        //!@param Servidor: 0 - Segurança ou 1 - Aplicação
        //!@param connection: Conection passado por referência
        //!@return string: Linhas Afetadas
        /// <summary>
        /// Rotina de Execução de Procedure
        /// </summary>
        /// <param name="Procdr">Procedure</param>
        /// <param name="param">parametro</param>
        /// <param name="Servidor">0 - Segurança ou 1 - Aplicação</param>
        /// <param name="connection"> Conection passado por referência</param>
        /// <returns>Retorna o DataSet da Busca</returns>        /// <returns>Linhas Afetadas</returns>
        public string ExecmdProc(String Procdr, String param, int Servidor, ref SqlConnection connection)
        {
            _sError = null;

            if (Servidor == 0)
                connectionServer = ConnectionStringSeq;
            else
                connectionServer = ConnectionString;

            string RstExec = "0";
            System.Globalization.CultureInfo BR = new System.Globalization.CultureInfo("pt-BR");
            try
            {
                //using (SqlConnection connection = new SqlConnection(connectionServer))
                //{
                String queryString = "Exec " + Procdr + " " + param;
                SqlCommand sqlcommand = new SqlCommand(queryString, connection);
                System.Data.SqlClient.SqlDataAdapter dataAdapter = new System.Data.SqlClient.SqlDataAdapter(sqlcommand);
                RstExec = dataAdapter.SelectCommand.ExecuteNonQuery().ToString();
                //}
            }
            catch (Exception exp)
            {
                _sError = sTrataError(exp.ToString());
                RstExec = _sError;
            }
            return RstExec;
        }

        //!ExecmdProc: Rotina de Execução de Procedure
        //!@param Procdr: Procedure
        //!@param param: parametro
        //!@param Servidor: 0 - Segurança ou 1 - Aplicação
        //!@return string: Linhas Afetadas
        /// <summary>
        /// Rotina de Execução de Procedure
        /// </summary>
        /// <param name="Procdr">Procedure</param>
        /// <param name="param">parametro</param>
        /// <param name="Servidor">0 - Segurança ou 1 - Aplicação</param>
        /// <returns>Retorna o DataSet da Busca</returns>        /// <returns>Linhas Afetadas</returns>
        public string ExecmdProc(String Procdr, String param, int Servidor)
        {
            _sError = null;

            if (Servidor == 0)
                connectionServer = ConnectionStringSeq;
            else
                connectionServer = ConnectionString;

            string RstExec = "0";
            System.Globalization.CultureInfo BR = new System.Globalization.CultureInfo("pt-BR");
            try
            {
                using (SqlConnection connection = new SqlConnection(connectionServer))
                {
                    String queryString = "Exec " + Procdr + " " + param;
                    SqlCommand sqlcommand = new SqlCommand(queryString, connection);
                    System.Data.SqlClient.SqlDataAdapter dataAdapter = new System.Data.SqlClient.SqlDataAdapter(sqlcommand);
                    connection.Open();
                    RstExec = dataAdapter.SelectCommand.ExecuteNonQuery().ToString();
                    connection.Close();
                }
            }
            catch (Exception exp)
            {
                _sError = sTrataError(exp.ToString());
                RstExec = _sError;
            }
            return RstExec;
        }


        //!ExecmdProc: Rotina de Execução de Procedure
        //!@param Procdr: Procedure
        //!@param param: parametro
        //!@return string: Linhas Afetadas
        /// <summary>
        /// Rotina de Execução de Procedure
        /// </summary>
        /// <param name="Procdr">Procedure</param>
        /// <param name="param">parametro</param>
        /// <returns>Retorna o DataSet da Busca</returns>        /// <returns>Linhas Afetadas</returns>
        public string ExecmdProc(String Procdr, String param)
        {
            _sError = null;

            connectionServer = ConnectionString;

            string RstExec = "0";
            System.Globalization.CultureInfo BR = new System.Globalization.CultureInfo("pt-BR");
            try
            {
                using (SqlConnection connection = new SqlConnection(connectionServer))
                {
                    String queryString = "Exec " + Procdr + " " + param;
                    SqlCommand sqlcommand = new SqlCommand(queryString, connection);
                    System.Data.SqlClient.SqlDataAdapter dataAdapter = new System.Data.SqlClient.SqlDataAdapter(sqlcommand);
                    connection.Open();
                    RstExec = dataAdapter.SelectCommand.ExecuteNonQuery().ToString();
                    connection.Close();
                }
            }
            catch (Exception exp)
            {
                _sError = sTrataError(exp.ToString());
                RstExec = _sError;
            }
            return RstExec;
        }


        //!Exevalue: Rotina de Execução de Procedure
        //!@param Procdr: Procedure
        //!@param param: parametro
        //!@param Servidor: 0 - Segurança ou 1 - Aplicação
        //!@param connection:Conection passado por referência
        //!@return string : Retorna o valor da Execução
        /// <summary>
        /// Rotina de Execução de Procedure
        /// </summary>
        /// <param name="Procdr">Procedure</param>
        /// <param name="param">Prametro</param>
        /// <param name="Servidor">0 - Segurança ou 1 - Aplicação</param>
        /// <param name="connection"> Conection passado por referência</param>
        /// <returns>Retorna o valor da Execução</returns>
        public string Exevalue(String Procdr, String param, int Servidor, ref SqlConnection connection)
        {
            _sError = null;

            if (Servidor == 0)
                connectionServer = ConnectionStringSeq;
            else
                connectionServer = ConnectionString;

            string RstExec = "0";
            System.Globalization.CultureInfo BR = new System.Globalization.CultureInfo("pt-BR");
            try
            {
                //using (SqlConnection connection = new SqlConnection(connectionServer))
                //{
                String queryString = "Exec " + Procdr + " " + param;
                SqlCommand sqlcommand = new SqlCommand(queryString, connection);
                System.Data.SqlClient.SqlDataAdapter dataAdapter = new System.Data.SqlClient.SqlDataAdapter(sqlcommand);
                //connection.Open();
                RstExec = dataAdapter.SelectCommand.ExecuteScalar().ToString();
                //connection.Close();
                //}
            }
            catch (Exception exp)
            {
                _sError = sTrataError(exp.ToString());
                RstExec = _sError;
            }
            return RstExec;
        }




        //!Exevalue: Rotina de Execução de Procedure
        //!@param Procdr: Procedure
        //!@param param: parametro
        //!@param Servidor: 0 - Segurança ou 1 - Aplicação
        //!@return string : Retorna o valor da Execução
        /// <summary>
        /// Rotina de Execução de Procedure
        /// </summary>
        /// <param name="Procdr">Procedure</param>
        /// <param name="param">Prametro</param>
        /// <param name="Servidor">0 - Segurança ou 1 - Aplicação</param>
        /// <returns>Retorna o valor da Execução</returns>
        public string Exevalue(String Procdr, String param, int Servidor)
        {
            _sError = null;

            if (Servidor == 0)
                connectionServer = ConnectionStringSeq;
            else
                connectionServer = ConnectionString;

            string RstExec = "0";
            System.Globalization.CultureInfo BR = new System.Globalization.CultureInfo("pt-BR");
            try
            {
                using (SqlConnection connection = new SqlConnection(connectionServer))
                {
                    String queryString = "Exec " + Procdr + " " + param;
                    SqlCommand sqlcommand = new SqlCommand(queryString, connection);
                    System.Data.SqlClient.SqlDataAdapter dataAdapter = new System.Data.SqlClient.SqlDataAdapter(sqlcommand);
                    connection.Open();
                    RstExec = dataAdapter.SelectCommand.ExecuteScalar().ToString();
                    connection.Close();
                }
            }
            catch (Exception exp)
            {
                _sError = sTrataError(exp.ToString());
                RstExec = _sError;
            }
            return RstExec;
        }


        //!Exevalue: Rotina de Execução de Procedure
        //!@param Procdr: Procedure
        //!@param param: parametro
        //!@return string: Retorna o valor da Execução
        /// <summary>
        /// Rotina de Execução de Procedure
        /// </summary>
        /// <param name="Procdr">Procedure</param>
        /// <param name="param">Prametro</param>
        /// <returns>Retorna o valor da Execução</returns>
        public string Exevalue(String Procdr, String param)
        {
            _sError = null;

            connectionServer = ConnectionStringSeq;
            string RstExec = "0";
            System.Globalization.CultureInfo BR = new System.Globalization.CultureInfo("pt-BR");
            try
            {
                using (SqlConnection connection = new SqlConnection(connectionServer))
                {
                    String queryString = "Exec " + Procdr + " " + param;
                    SqlCommand sqlcommand = new SqlCommand(queryString, connection);
                    System.Data.SqlClient.SqlDataAdapter dataAdapter = new System.Data.SqlClient.SqlDataAdapter(sqlcommand);
                    connection.Open();
                    RstExec = dataAdapter.SelectCommand.ExecuteScalar().ToString();
                    connection.Close();
                }
            }
            catch (Exception exp)
            {
                _sError = sTrataError(exp.ToString());
                RstExec = _sError;
            }
            return RstExec;
        }

        //!Excsel: Rotina de Execução de Procedure
        //!@param Procdr: Procedure
        //!@param param: parametro
        //!@param RstExec: ref. string Error
        //!@param Servidor: 0 - Segurança ou 1 - Aplicação
        //!@param connection: Connection - Conection passado por referência</param>

        //!@return DataSet: Retorna o DataSet da Busca
        //!Para 
        /// <summary>
        /// Rotina de Execução de Procedure
        /// </summary>
        /// <param name="Procdr">Procedure</param>
        /// <param name="param">Prametro</param>
        /// <param name="RstExec">String de Error</param>
        /// <param name="Servidor">0 - Segurança ou 1 - Aplicação</param>
        /// <param name="connection"> Conection passado por referência</param>
        public DataSet Excsel(String Procdr, String param, ref string RstExec, int Servidor, ref SqlConnection connection)
        {
            _sError = null;
            if (Servidor == 0)
                connectionServer = ConnectionStringSeq;
            else
                connectionServer = ConnectionString;

            System.Globalization.CultureInfo BR = new System.Globalization.CultureInfo("pt-BR");
            DataSet ds = new DataSet();
            try
            {
                //using (SqlConnection connection = new SqlConnection(connectionServer))
                //{
                String queryString = "Exec " + Procdr + " " + param;
                SqlCommand sqlcommand = new SqlCommand(queryString, connection);
                System.Data.SqlClient.SqlDataAdapter dataAdapter = new System.Data.SqlClient.SqlDataAdapter(sqlcommand);
                //connection.Open();
                dataAdapter.Fill(ds);
                return ds;
                //}

            }
            catch (Exception exp)
            {
                //RstExec = sTrataError(exp.ToString());
                _sError = sTrataError(exp.ToString());
                return ds = null;
            }
        }


        //!Excsel: Rotina de Execução de Procedure
        //!@param Procdr: Procedure
        //!@param param: parametro
        //!@param RstExec: ref. string Error
        //!@param Servidor: 0 - Segurança ou 1 - Aplicação
        //!@return DataSet: Retorna o DataSet da Busca
        //!Para 
        /// <summary>
        /// Rotina de Execução de Procedure
        /// </summary>
        /// <param name="Procdr">Procedure</param>
        /// <param name="param">Prametro</param>
        /// <param name="RstExec">String de Error</param>
        /// <param name="Servidor">0 - Segurança ou 1 - Aplicação</param>
        public DataSet Excsel(String Procdr, String param, ref string RstExec, int Servidor)
        {
            _sError = null;
            if (Servidor == 0)
                connectionServer = ConnectionStringSeq;
            else
                connectionServer = ConnectionString;

            System.Globalization.CultureInfo BR = new System.Globalization.CultureInfo("pt-BR");
            DataSet ds = new DataSet();
            try
            {
                using (SqlConnection connection = new SqlConnection(connectionServer))
                {
                    String queryString = "Exec " + Procdr + " " + param;
                    SqlCommand sqlcommand = new SqlCommand(queryString, connection);
                    System.Data.SqlClient.SqlDataAdapter dataAdapter = new System.Data.SqlClient.SqlDataAdapter(sqlcommand);
                    connection.Open();
                    dataAdapter.Fill(ds);
                    RstExec = string.Empty;
                    return ds;
                }

            }
            catch (Exception exp)
            {
                RstExec = sTrataError(exp.ToString());
                _sError = sTrataError(exp.ToString());
                return ds = null;
            }
        }


        //!sTrataError: Rotina que trata o Error
        //!@param Error: Error
        //!@return string: Error Tratado
        /// <summary>
        /// Rotina que trata o Error
        /// </summary>
        /// <param name="Error">Error</param>
        /// <returns>Error Tratado</returns>
        private string sTrataError(string Error)
        {

            if (Error.Contains("Incorrect syntax"))
            {
                Error = "Error - Login Formato Incorreto !";
            }
            else if (Error.Contains("Password validation"))
            {
                Error = "Error - Senha com formato Invalido ! - A Senha deve conter numeros e letras (maiusculas e minusculas) exe: Central01";
            }
            else if (Error.Contains("UNIQUE"))
            {
                Error = "Error - Duplicidade de Registro !!"; //Já existe este Cadastro !!!!";
            }
            else if (Error.Contains("Could not find stored procedure"))
            {
                Error = "Error - Não Localizada no Procedure no Banco !!!!";
            }
            else if (Error.Contains("Cannot find the object"))
            {
                Error = "Error - Objeto não Localizado no Banco !!!!";
            }
            else if (Error.Contains("REFERENCE"))
            {
                Error = "Error - Registro está sendo Usado em outro Processo !!!!";
            }
            else
            {
                Error = "Fatal - " + Error;
            }

            return Error;
        }


    }
}
