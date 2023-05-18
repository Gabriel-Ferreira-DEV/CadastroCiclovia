using System;
using System.Data.SqlClient;
using System.Data;
using System.Configuration;
using System.IO;
using System.Runtime.Serialization.Formatters.Binary;
using System.Windows.Forms;
using System.IO.Compression;

namespace ClassDados
{
    public class ClasseDml2
    {
        public bool bLog = true;
        public string sCodUsr = "0";
        public SqlConnection connection;
        public bool bExiberTeste = false;
        tnwsofthi.Servicetnw cmdw = new tnwsofthi.Servicetnw();
        public string sUrlWeb = "";
        public bool bWeb = false;
        public bool bWebZ = false;
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
                //connection = new SqlConnection(ConnectionString);
            }
        }

        public ClasseDml2()
        {
            string sWeb = "False";
            try
            {
                sWeb = ConfigurationManager.AppSettings["Web"].ToString();
                if (sUrlWeb == "")
                    sUrlWeb = ConfigurationManager.AppSettings["UrlWeb"].ToString();
            }
            catch { }
            bWeb = (sWeb == "True");

            string sWebZ = "False";
            try
            {
                sWebZ = ConfigurationManager.AppSettings["WebZ"].ToString();
            }
            catch { }
            bWebZ = (sWebZ == "True");
        }

        public void RegForm(string sForm, string sModo)
        {
            try
            {
                string sParam = "'" + sForm + "','" + sModo + "'," + sCodUsr;
                ExecmdProc("PPInsMonitorProc", sParam);
            }
            catch { }
        }

        void criaCredencial()
        {
            if (cmdw.SegurancaClientesValue == null)
            {
                cmdw.SegurancaClientesValue = new tnwsofthi.SegurancaClientes();
                cmdw.SegurancaClientesValue.Usuario = "Softhiocr";
                cmdw.SegurancaClientesValue.Senha = "lapSofthi2017";
            }
        }

        public bool abreConn()
        {
            _sError = null;
            bool bresult = false;
            FrmMsgD frmM = new FrmMsgD();
            if (bWeb)
            {
                try
                {
                    if (bExiberTeste)
                        frmM.sMsg2 = "Conectando Servidor...";
                    bExiberTeste = false;
                    cmdw.Url = sUrlWeb;
                    cmdw.SegurancaClientesValue = new tnwsofthi.SegurancaClientes();
                    cmdw.SegurancaClientesValue.Usuario = "Softhiocr";
                    cmdw.SegurancaClientesValue.Senha = "lapSofthi2017";

                    frmM.Refresh();
                    string sRet = cmdw.Valcmd("TestaWsrv", "");
                    bresult = (sRet == "OK");
                    if (!bresult)
                        _sError = "Usuário Não Autenticado!!";
                }
                catch (Exception ex)
                {
                    _sError = sTrataError(ex.ToString());
                }
                frmM.Close();
            }
            else
            {
                try
                {
                    connection = new SqlConnection(ConnectionString);
                    connection.Open();
                    bresult = true;
                }

                catch (Exception exp)
                {
                    _sError = sTrataError(exp.ToString());
                }
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
                {
                    connection.Close();
                    connection.Dispose();
                    connection = null;
                }
                bresult = true;
            }
            catch (Exception exp)
            {
                _sError = sTrataError(exp.ToString());
            }
            return bresult;
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
        public bool ControlaTran(int nTipo)
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
        public string ExecmdProc(String Procdr, String param)
        {
            _sError = null;
            string RstExec = "0";

            connectionServer = ConnectionString;

            if (bWeb)
            {
                cmdw.Url = sUrlWeb;
                criaCredencial();
                try
                {
                    RstExec = cmdw.Proccmd(Procdr.Replace("PP", ""), param);
                    if (RstExec.Length > 6)
                        _sError = RstExec;
                }
                catch (Exception exp)
                {
                    _sError = sTrataError(exp.ToString());
                    RstExec = _sError;
                }

            }
            else
            {

                System.Globalization.CultureInfo BR = new System.Globalization.CultureInfo("pt-BR");
                try
                {
                    String queryString = "Exec " + Procdr + " " + param;
                    SqlCommand sqlcommand = new SqlCommand(queryString, connection);
                    System.Data.SqlClient.SqlDataAdapter dataAdapter = new System.Data.SqlClient.SqlDataAdapter(sqlcommand);
                    RstExec = dataAdapter.SelectCommand.ExecuteNonQuery().ToString();
                    if (RstExec.Length > 6)
                        _sError = RstExec;
                }
                catch (Exception exp)
                {
                    _sError = sTrataError(exp.ToString());
                    RstExec = _sError;
                }
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
        /// <returns>Retorna o valor da Execução</returns>
        public string Exevalue(String Procdr, String param)
        {
            _sError = null;

            connectionServer = ConnectionString;

            string RstExec = "0";
            if (bWeb)
            {
                cmdw.Url = sUrlWeb;
                criaCredencial();
                try
                {
                    RstExec = cmdw.Valcmd(Procdr.Replace("PP", ""), param);
                }
                catch (Exception exp)
                {
                    if (exp.Message.Contains("provider: TCP Provider"))
                    {
                        fechaConn();
                        if (abreConn())
                            Exevalue(Procdr, param);
                        else
                        {
                            _sError = sTrataError(exp.ToString());
                            RstExec = _sError;
                        }
                    }
                    else
                    {
                        _sError = sTrataError(exp.ToString());
                        RstExec = _sError;
                    }
                }

            }
            else
            {
                System.Globalization.CultureInfo BR = new System.Globalization.CultureInfo("pt-BR");
                try
                {
                    String queryString = "Exec " + Procdr + " " + param;
                    SqlCommand sqlcommand = new SqlCommand(queryString, connection);
                    System.Data.SqlClient.SqlDataAdapter dataAdapter = new System.Data.SqlClient.SqlDataAdapter(sqlcommand);
                    RstExec = dataAdapter.SelectCommand.ExecuteScalar().ToString();
                }
                catch (Exception exp)
                {
                    if (exp.Message.Contains("provider: TCP Provider"))
                    {
                        fechaConn();
                        if (abreConn())
                            Exevalue(Procdr, param);
                        else
                        {
                            _sError = sTrataError(exp.ToString());
                            RstExec = _sError;
                        }
                    }
                    else
                    {
                        _sError = sTrataError(exp.ToString());
                        RstExec = _sError;
                    }
                }
            }
            return RstExec;
        }

        public static byte[] Compress(byte[] data)
        {
            MemoryStream output = new MemoryStream();
            using (DeflateStream dstream = new DeflateStream(output, CompressionMode.Compress))
            {
                dstream.Write(data, 0, data.Length);
            }
            return output.ToArray();
        }

        public static byte[] Decompress(byte[] data)
        {
            MemoryStream input = new MemoryStream(data);
            MemoryStream output = new MemoryStream();
            using (DeflateStream dstream = new DeflateStream(input, CompressionMode.Decompress))
            {
                dstream.CopyTo(output);
            }
            return output.ToArray();
        }


        DataSet ByteToBind(byte[] bBind)
        {

            MemoryStream originalFileStream = new MemoryStream(bBind);
            byte[] bBind2 = Decompress(bBind);

            BinaryFormatter formatter = new BinaryFormatter();
            MemoryStream memoryStream = new MemoryStream(bBind2);
            BindingSource newDataSource = new BindingSource();
            newDataSource.DataSource = formatter.Deserialize(memoryStream);

            DataSet bds = new DataSet();
            bds = (DataSet)newDataSource.DataSource;
            bds.Tables[0].TableName = "Table";//newDataSource.DataMember;
            return bds;
        }

        byte[] DtsToByte(DataSet bds, bool bCompres)
        {
            byte[] bRet = new byte[1];
            try
            {
                BindingSource binds = new BindingSource();
                binds.DataSource = bds;
                binds.DataMember = bds.Tables[0].TableName;
                MemoryStream memoryStream = new MemoryStream();
                BinaryFormatter formatter = new BinaryFormatter();
                formatter.Serialize(memoryStream, binds.DataSource);
                memoryStream.Position = 0;
                if (bCompres)
                    bRet = Compress(memoryStream.ToArray());
                else
                    bRet = memoryStream.ToArray();
            }
            catch { };
            return bRet;
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
        /// <returns>Retorna o Dataset de dados</returns>
        /// <param name="RstExec">String de Error</param>
        public DataSet Excsel(String Procdr, String param)
        {
            _sError = null;
            connectionServer = ConnectionString;
            System.Globalization.CultureInfo BR = new System.Globalization.CultureInfo("pt-BR");
            DataSet ds = new DataSet();

            if (bWeb)
            {
                try
                {
                    cmdw.Url = sUrlWeb;
                    criaCredencial();
                    if (!bWebZ)
                    {
                        ds = cmdw.SelCmd(Procdr.Replace("PP", ""), param);
                        //byte[] bDts = DtsToByte(ds, false);
                    }
                    else
                    {
                        //28.426.953
                        // 1.854.698
                        byte[] bDts = cmdw.SelCmdZ(Procdr.Replace("PP", ""), param);
                        ds = ByteToBind(bDts);
                    }
                    return ds;
                }
                catch (Exception exp)
                {
                    if (exp.Message.Contains("provider: TCP Provider"))
                    {
                        fechaConn();
                        if (abreConn())
                            Exevalue(Procdr, param);
                        else
                        {
                            _sError = sTrataError(exp.ToString());
                        }
                    }
                    else
                    {
                        _sError = sTrataError(exp.ToString());
                    }
                    return ds = null;

                }

            }
            else
            {
                try
                {
                    String queryString = "Exec " + Procdr + " " + param;
                    SqlCommand sqlcommand = new SqlCommand(queryString, connection);
                    sqlcommand.CommandTimeout = 120;
                    System.Data.SqlClient.SqlDataAdapter dataAdapter = new System.Data.SqlClient.SqlDataAdapter(sqlcommand);
                    dataAdapter.Fill(ds);
                    return ds;
                }
                catch (Exception exp)
                {

                    if (exp.Message.Contains("provider: TCP Provider"))
                    {
                        fechaConn();
                        if (abreConn())
                            Exevalue(Procdr, param);
                        else
                        {
                            _sError = sTrataError(exp.ToString());
                        }
                    }
                    else
                    {
                        _sError = sTrataError(exp.ToString());
                    }
                    return ds = null;
                }
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
