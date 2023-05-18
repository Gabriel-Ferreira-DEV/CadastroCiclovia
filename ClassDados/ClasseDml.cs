using System;
using System.Data.SqlClient;
using System.Data;

namespace ClassDados
{
    public class ClasseDml
    {
        public bool bLog = true;
        public string sCodUsr = "0";

        private string connectionServer = "";
        public  SqlConnection connection; 
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
                connection = new SqlConnection(ConnectionString);
            }
        }

        public ClasseDml()
        {

        }


        public bool abreConn()
        {
            _sError = null;
            bool bresult = false;
            try
            {
                connection.Open();
                bresult = true;
            }
            catch (Exception exp)
            {
                _sError = sTrataError(exp.ToString());
            }
            return bresult;
        }


        public bool fechaConn()
        {
            _sError = null;
            bool bresult = false;
            try
            {
                if (connection != null)
                    connection.Close();
                bresult = true;
            }
            catch (Exception exp)
            {
                _sError = sTrataError(exp.ToString());
            }
            return bresult;
        }

        //!ControlaTran: Rotina de Execução de Procedure (0 -Begin Tran, 1-Commit, 2-Rollback)
        //!@param nTipo: Transacional  = 0 -Begin Tran, 1-Commit, 2-Rollback
        //!@param connection: Conection passado por referência
        //!@return bool: Retorna o True/False da Execução
        /// <summary>
        /// Rotina de Execução de Procedure (0 -Begin Tran, 1-Commit, 2-Rollback)
        /// </summary>
        /// <param name="Procdr">Tipo Tran</param>
        /// <param name="param">connection</param>
        /// <returns>Retorna o True/False da Execução</returns>
        public bool ControlaTran(int nTipo)
        {
            _sError = null;
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

        public void RegForm(string sForm, string sModo)
        {
            try
            {
                string sParam = "'" + sForm + "','" + sModo + "'," + sCodUsr;
                ExecmdPrc("PPInsMonitorProc", sParam);
            }
            catch { }
        }

        string ExecmdPrc(String Procdr, String param)
        {
            _sError = null;

            connectionServer = ConnectionString;

            string RstExec = "0";
            System.Globalization.CultureInfo BR = new System.Globalization.CultureInfo("pt-BR");
            try
            {
                String queryString = "Exec " + Procdr + " " + param;
                SqlCommand sqlcommand = new SqlCommand(queryString, connection);
                System.Data.SqlClient.SqlDataAdapter dataAdapter = new System.Data.SqlClient.SqlDataAdapter(sqlcommand);
                RstExec = dataAdapter.SelectCommand.ExecuteNonQuery().ToString();
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
        public string ExecmdProc(String Procdr, String param)
        {
            try
            {
                string sParam = "'" + Procdr + "','" + param.Replace("'", "|") + "'," + sCodUsr;
                if (bLog)
                    ExecmdPrc("PPInsMonitorProc", sParam);
            }
            catch { }

            _sError = null;

            connectionServer = ConnectionString;

            string RstExec = "0";
            System.Globalization.CultureInfo BR = new System.Globalization.CultureInfo("pt-BR");
            try
            {
                String queryString = "Exec " + Procdr + " " + param;
                SqlCommand sqlcommand = new SqlCommand(queryString, connection);
                System.Data.SqlClient.SqlDataAdapter dataAdapter = new System.Data.SqlClient.SqlDataAdapter(sqlcommand);
                if (Procdr == "PPUpdExportacaoInf")
                    dataAdapter.SelectCommand.CommandTimeout = 3600;
                RstExec = dataAdapter.SelectCommand.ExecuteNonQuery().ToString();
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
        public string Exevalue(String Procdr, String param)
        {
            //try
            //{
            //    string sParam = "'" + Procdr + "','" + param.Replace("'", "|") + "'," + sCodUsr;
            //    if (bLog)
            //        ExecmdPrc("PPInsMonitorProc", sParam);
            //}
            //catch { }

            _sError = null;

            connectionServer = ConnectionString;

            string RstExec = "0";
            System.Globalization.CultureInfo BR = new System.Globalization.CultureInfo("pt-BR");
            try
            {
                String queryString = "Exec " + Procdr + " " + param;
                SqlCommand sqlcommand = new SqlCommand(queryString, connection);
                SqlDataAdapter dataAdapter = new SqlDataAdapter(sqlcommand);
                RstExec = dataAdapter.SelectCommand.ExecuteScalar().ToString();
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
        public DataSet Excsel(String Procdr, String param)
        {
            try
            {
                string sParam = "'" + Procdr + "','" + param.Replace("'", "|") + "'," + sCodUsr;
                if (bLog)
                    ExecmdPrc("PPInsMonitorProc", sParam);
            }
            catch { }

            _sError = null;
            connectionServer = ConnectionString;
            System.Globalization.CultureInfo BR = new System.Globalization.CultureInfo("pt-BR");
            DataSet ds = new DataSet();
            try
            {
                String queryString = "Exec " + Procdr + " " + param;
                SqlCommand sqlcommand = new SqlCommand(queryString, connection);
                System.Data.SqlClient.SqlDataAdapter dataAdapter = new System.Data.SqlClient.SqlDataAdapter(sqlcommand);
                dataAdapter.Fill(ds);
                return ds;
            }
            catch (Exception exp)
            {
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
                Error = "Error - Sintax Incorreta !";
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

        public string formataData(DateTime dt)
        {
            return dt.Month.ToString() + "/" + dt.Day.ToString() + "/" + dt.Year.ToString();
        }

    }
}
