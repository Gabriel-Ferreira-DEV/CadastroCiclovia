using System;
using RegrasNegocio;
using CrystalDecisions.Shared;
using CrystalDecisions.CrystalReports.Engine;
using System.IO;
using System.Windows.Forms;
using System.Data;


namespace ClassCrystalVs2010
{
    public class csCrystal
    {
        FrmMsg crn = new FrmMsg();
        public string sServidorSql = "";
        public string sBancoSql = "";
        public string sUsr = "vox41";
        public string sPwd = "vox41";
        public string sCodUsr = "0";
        public bool bXML = false;
        public string sURL = "";
        public bool bDeleta = true;

        public string sParam1 = "", sParam2 = "", sParam3 = "", sParam4 = "", sParam5 = "", sParam6 = "", sParam7 = "";
        public bool bShow = true;

        public csCrystal()
        {

        }

        ReportDocument setDatabaserpt(string sRpt)
        {
            ConnectionInfo crconnectioninfo = new ConnectionInfo();
            ReportDocument cryrpt = new ReportDocument();
            TableLogOnInfos crtablelogoninfos = new TableLogOnInfos();
            TableLogOnInfo crtablelogoninfo = new TableLogOnInfo();

            Tables CrTables;

            crconnectioninfo.ServerName = sServidorSql;
            crconnectioninfo.DatabaseName = sBancoSql;
            crconnectioninfo.UserID = sUsr;
            crconnectioninfo.Password = sPwd;


            cryrpt.Load(sRpt);

            CrTables = cryrpt.Database.Tables;


            foreach (CrystalDecisions.CrystalReports.Engine.Table CrTable in CrTables)
            {
                crtablelogoninfo = CrTable.LogOnInfo;
                crtablelogoninfo.ConnectionInfo = crconnectioninfo;
                CrTable.ApplyLogOnInfo(crtablelogoninfo);
            }

            return cryrpt;
            //cryrpt.RecordSelectionFormula = getCustInfoRptSelection();
            //cryrpt.Refresh();
        }

        public string excRpt(string sRpt, DataSet dts, string sNovoNome = null, bool bPdf  = true)
        {
            //sParam1 = "000017";
            //sParam2 = "2018-08-15";
            string sArqPdf = "";
            string sErro = "";
            try
            {
                if (sURL == "")
                {
                    crn = new RegrasNegocio.FrmMsg();
                    crn.sMsg2 = "Gerando Relatório ...";
                    crn.Refresh();
                }
                sErro = sRpt;
                if (!File.Exists(sErro))
                {
                    if (sURL == "")
                    {
                        crn = new RegrasNegocio.FrmMsg();
                        crn.sMsg2 = "Falta Arquivo RPT !!";
                    }
                    return "Erro: Falta Arquivo RPT !!";
                }
                ReportDocument rpt = null;
                if (!bXML)
                {
                    rpt = setDatabaserpt(sRpt);
                    rpt.SetDatabaseLogon(sUsr, sPwd, sServidorSql, sBancoSql);
                }
                else
                {
                    string sWriteXml = sRpt.ToLower().Replace(".rpt", "") + ".xml";
                    string sWriteXmlSchema = sRpt.ToLower().Replace(".rpt", "") + ".xsd";
                    try
                    {
                        if (File.Exists(sWriteXml))
                            File.Delete(sWriteXml);
                        if (File.Exists(sWriteXmlSchema))
                            File.Delete(sWriteXmlSchema);
                    }
                    catch { }
                    dts.WriteXml(sWriteXml);
                    dts.WriteXmlSchema(sWriteXmlSchema);
                    //MessageBox.Show(sWriteXml);
                    rpt = new ReportDocument();
                    rpt.Load(sRpt);
                    rpt.Database.Tables[0].SetDataSource(dts.Tables[0]);
                }
                ExpPdf cmd = new ExpPdf();
                cmd.setparam(ref rpt, sParam1, sParam2, sParam3, sParam4, sParam5, "", "");
                string sArquivo = "";
                
                sArquivo = cmd.Gerapdf(sRpt.ToLower().Replace(".rpt", ""), ref rpt, sNovoNome);
                //sArquivo = cmd.GeraXls(sRpt.ToLower().Replace(".rpt", ""), ref rpt, sNovoNome);

                if (sURL != "")
                    return sArquivo;
                else
                {
                    if (sArquivo.Substring(0, 5) == "Erro")
                        crn.sMsg = sArquivo;
                    else
                    {
                        if (File.Exists(sArquivo))
                        {
                            crn.Hide();
                            FrmPDF pdf = new FrmPDF();
                            pdf.sArquivo = sArquivo;

                            if ((bShow) && (sURL == ""))
                            {
                                pdf.dts = dts;
                                pdf.ShowDialog();
                            }
                            try
                            {
                                if (bDeleta)
                                    File.Delete(sArquivo);
                            }
                            catch(Exception ex)
                            {
                                string erro = ex.Message;
                            }

                        }
                        else
                        {
                            if (sURL == "")
                            {
                                crn = new RegrasNegocio.FrmMsg();
                                crn.Hide();
                                crn.sMsg = "Falha Exportação";
                                crn.ShowDialog();
                            }
                            else
                                return "Falha Exportação";
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                if (sURL == "")
                {
                    crn.Hide();
                    MessageBox.Show("Erro:\r\n" + ex.Message, "Relatório", MessageBoxButtons.OK, MessageBoxIcon.Error);
                }
                else
                    return "Erro: " + ex.Message;
            }
            return sArqPdf;
        }

        public string excRptLocal(string sRpt)
        {
            string sArqPdf = "";
            string sErro = "";
            try
            {

                crn = new RegrasNegocio.FrmMsg();
                crn.sMsg2 = "Gerando Relatório ...";
                crn.Refresh();
                ReportDocument rpt = new ReportDocument();
                sErro = sRpt;
                if (File.Exists(sErro))
                    rpt.Load(sRpt);
                else
                {
                    crn.sMsg = "Falta Arquivo RPT !!";
                    return "";
                }
                //sErro = "";
                ExpPdf cmd = new ExpPdf();
                rpt.SetDatabaseLogon(sUsr, sPwd, sServidorSql, sBancoSql);
                cmd.setparam(ref rpt, sParam1, sParam2, sParam3, sParam4, sParam5, "", "");
                string sArquivo = cmd.Gerapdf("Rel" + sCodUsr + ".tmp", ref rpt);

                if (sArquivo.Substring(0, 5) == "Erro")
                    MessageBox.Show("Erro:\r\n" + sArquivo, "Relatório", MessageBoxButtons.OK, MessageBoxIcon.Error);
                else
                {
                    if (File.Exists(sArquivo))
                    {
                        return sArquivo;
                    }
                    else
                    {
                        crn = new RegrasNegocio.FrmMsg();
                        crn.Hide();
                        crn.sMsg = "Falha Exportação";
                        crn.ShowDialog();
                    }
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show("Erro:\r\n" + ex.Message, "Relatório", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
            return sArqPdf;
        }


        public string AbreRPT(string sRpt)
        {
            string sArqPdf = "";
            string sErro = "";
            try
            {

                crn = new RegrasNegocio.FrmMsg();
                crn.sMsg2 = "Carregando Relatório ...";
                crn.Refresh();
                ReportDocument rpt = new ReportDocument();
                sErro = sRpt;
                if (File.Exists(sErro))
                    rpt.Load(sRpt);
                else
                {
                    crn = new RegrasNegocio.FrmMsg();
                    crn.sMsg = "Falta Arquivo RPT !!";
                    return "";
                }
                //sErro = "";
                ExpPdf cmd = new ExpPdf();
                rpt.SetDatabaseLogon(sUsr, sPwd, sServidorSql, sBancoSql);
                cmd.setparam(ref rpt, sParam1, sParam2, sParam3, sParam4, sParam5, "", "");
                FrmRpt frm = new FrmRpt();
                frm.crpW.ReportSource = rpt;
                crn.Close();
                frm.ShowDialog();
            }
            catch (Exception ex)
            {
                MessageBox.Show("Erro:\r\n" + ex.Message, "Relatório", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
            return sArqPdf;
        }
    }
}
