using System;
using CrystalDecisions.Shared;
using CrystalDecisions.CrystalReports.Engine;
using System.IO;
using System.Configuration;
using Microsoft.Win32;
using System.Security.Cryptography;
using System.Windows.Forms;
using CrystalDecisions.Windows.Forms;
using System.IO;

namespace ClassCrystalVs2010
{
	/// <summary>
	/// Summary description for ExpPdf.
	/// </summary>
	public class ExpPdf
	{
		public ExpPdf()
		{
		}

		public void setparam(ref ReportDocument rpt, 
			string param1, string param2, string param3, string param4, string param5, string param6, string param7)
		{
			try
			{
				if (param1.Length >0)
				{
					rpt.SetParameterValue(0,param1.Trim());
				}
				if (param2.Length >0)
				{
					rpt.SetParameterValue(1,param2.Trim());
				}
				if (param3.Length >0)
				{
					rpt.SetParameterValue(2,param3.Trim());
				}
				if (param4.Length >0)
				{
					rpt.SetParameterValue(3,param4.Trim());
				}
				if (param5.Length >0)
				{
					rpt.SetParameterValue(4,param5.Trim());
				}
				if (param6.Length >0)
				{
					rpt.SetParameterValue(5,param6.Trim());
				}
				if (param7.Length >0)
				{
					rpt.SetParameterValue(6,param7.Trim());
				}
			}
           
            catch (Exception Ex)
			{
				
                string erro = Ex.ToString();
				erro = erro;
			}
		}

        public void setparam(ref ReportDocument rpt,
string param1, string param2, string param3, string param4, string param5, string param6, string param7, string param8, string param9, string param10, string param11, string param12)
        {
            try
            {
                if (param1.Length > 0)
                {
                    rpt.SetParameterValue(0, param1.Trim());
                }
                if (param2.Length > 0)
                {
                    rpt.SetParameterValue(1, param2.Trim());
                }
                if (param3.Length > 0)
                {
                    rpt.SetParameterValue(2, param3.Trim());
                }
                if (param4.Length > 0)
                {
                    rpt.SetParameterValue(3, param4.Trim());
                }
                if (param5.Length > 0)
                {
                    rpt.SetParameterValue(4, param5.Trim());
                }
                if (param6.Length > 0)
                {
                    rpt.SetParameterValue(5, param6.Trim());
                }
                if (param7.Length > 0)
                {
                    rpt.SetParameterValue(6, param7.Trim());
                }

                if (param8.Length > 0)
                {
                    rpt.SetParameterValue(7, param8.Trim());
                }


                if (param9.Length > 0)
                {
                    rpt.SetParameterValue(8, param9.Trim());
                }
                if (param10.Length > 0)
                {
                    rpt.SetParameterValue(9, param10.Trim());
                }
                if (param11.Length > 0)
                {
                    rpt.SetParameterValue(10, param11.Trim());
                }
                if (param12.Length > 0)
                {
                    rpt.SetParameterValue(11, param12.Trim());
                }

            }

            catch (Exception Ex)
            {

                string erro = Ex.ToString();
                MessageBox.Show("Erro:\r\n" + Ex.Message, "Relatório", MessageBoxButtons.OK, MessageBoxIcon.Error);
                erro = erro;
            }
        }


		public string Gerapdf(string filename , ref ReportDocument rpt, string sNovoNome = null)
		{
			try
			{
				//set the export format (ReportDocument)
				PdfRtfWordFormatOptions rptpdf = new PdfRtfWordFormatOptions();
				rpt.ExportOptions.FormatOptions = rptpdf;
				rpt.ExportOptions.ExportFormatType = ExportFormatType.PortableDocFormat;
				rpt.ExportOptions.ExportDestinationType = ExportDestinationType.DiskFile;
				//set the disk file options
                string patharq = filename + ".pdf";

                if (sNovoNome != null)
                    patharq = sNovoNome + ".pdf";

				DiskFileDestinationOptions diskOpts = new DiskFileDestinationOptions();
                try
                {
                    File.Delete(patharq);
                }
                catch { }
				diskOpts.DiskFileName = patharq;
				//exporta
				rpt.ExportOptions.DestinationOptions = diskOpts;

                //CrystalDecisions.Windows.Forms.CrystalReportViewer report = new CrystalReportViewer();
                //report.ReportSource = rpt;
				rpt.Export();
				string url = ""; 
				if (System.IO.File.Exists(patharq))
				{
                    url = patharq;//ConfigurationSettings.AppSettings["pathurl"]+filename;
				}
				else
				{
					url = "Erro: Relatório Não Foi Gerado ...";
				}
				return url;
			}
			catch (Exception Ex)
			{
                string erro = "Erro:" + Ex.ToString();
                MessageBox.Show("Erro:\r\n" + Ex.Message, "Relatório", MessageBoxButtons.OK, MessageBoxIcon.Error);
				return erro;
			}
		}

        public string GeraXls(string filename, ref ReportDocument rpt, string sNovoNome = null)
        {
            try
            {
                //set the export format (ReportDocument)
                ExcelFormatOptions rptpdf = new  ExcelFormatOptions();
                rpt.ExportOptions.FormatOptions = rptpdf;
                rpt.ExportOptions.ExportFormatType = ExportFormatType.Excel;
                rpt.ExportOptions.ExportDestinationType = ExportDestinationType.DiskFile;
                //set the disk file options
                string patharq = filename + ".xls";

                if (sNovoNome != null)
                    patharq = sNovoNome + ".xls";

                DiskFileDestinationOptions diskOpts = new DiskFileDestinationOptions();
                try
                {
                    File.Delete(patharq);
                }
                catch { }
                diskOpts.DiskFileName = patharq;
                //exporta
                rpt.ExportOptions.DestinationOptions = diskOpts;

                //CrystalDecisions.Windows.Forms.CrystalReportViewer report = new CrystalReportViewer();
                //report.ReportSource = rpt;
                rpt.Export();
                string url = "";
                if (System.IO.File.Exists(patharq))
                {
                    url = patharq;//ConfigurationSettings.AppSettings["pathurl"]+filename;
                }
                else
                {
                    url = "Erro: Relatório Não Foi Gerado ...";
                }
                return url;
            }
            catch (Exception Ex)
            {
                string erro = "Erro:" + Ex.ToString();
                MessageBox.Show("Erro:\r\n" + Ex.Message, "Relatório", MessageBoxButtons.OK, MessageBoxIcon.Error);
                return erro;
            }
        }


		public string nomerandom()
		{
			byte[] random = new Byte[10];
			//RNGCryptoServiceProvider is an implementation of a random number generator.
			RNGCryptoServiceProvider rng = new RNGCryptoServiceProvider();
			rng.GetNonZeroBytes(random); // The array is now filled with cryptographically strong random bytes, and none are zero.
			string nome = "";
			for (int i=1 ; i <10; i++)
			{
				 nome = nome +Convert.ToString(random[i]);
			}
			return nome+".pdf";
		}

	}
}
