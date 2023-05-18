using System;
using System.Windows.Forms;
using System.Drawing;
using System.Management;
//using ClsMD5;
using RegrasNegocio;

namespace Messagens
{
    public class ClsMessagens
    {

        private DataGridViewCellStyle cellstyle = new DataGridViewCellStyle();
        private DataGridViewCellStyle cellstyle2 = new DataGridViewCellStyle();
        private DataGridViewCellStyle cellstyle3 = new DataGridViewCellStyle();
        private DataGridViewCellStyle cellstyle4 = new DataGridViewCellStyle();

        public FrmSucesso frmS = new FrmSucesso();
        public FrmSucessoMin frmSm = new FrmSucessoMin();
        public FrmFalha frmF = new FrmFalha();
        public FrmAlerta frmA = new FrmAlerta();
        public FrmMsg frmM = new FrmMsg();
        public FrmPerg frmP = new FrmPerg();
        public FrmPergMin frmPm = new FrmPergMin(); 
        private string _sError = null;

        public string SError
        {
            get { return _sError; }
        }


        public ClsMessagens()
        {
            cellstyle.BackColor = Color.LemonChiffon;
            cellstyle2.BackColor = Color.LightCyan;
            cellstyle3.BackColor = Color.Gainsboro;
            cellstyle3.BackColor = Color.White;
        }

        public string lerHD(string drive)
        {
            _sError = null;
            try
            {
                ManagementObject disk = new ManagementObject("win32_logicaldisk.deviceid=\"" + drive + ":\"");
                disk.Get();
                string sHD = disk["VolumeSerialNumber"].ToString();
                return sHD;
            }
            catch (Exception ex)
            {
                _sError = ex.Message;
            }
            return "Erro HD";
        }
        


       
        public Color pegaCor(string sCor)
        {
            if (sCor.Contains("Magenta")) 
                return System.Drawing.Color.Magenta;
            if (sCor.Contains("Pink"))
                return System.Drawing.Color.Pink;
            if (sCor.Contains("DarkViolet"))
                return System.Drawing.Color.DarkViolet;
            if (sCor.Contains("Blue"))
                return System.Drawing.Color.Blue;
            if (sCor.Contains("DarkBlue"))
                return System.Drawing.Color.DarkBlue;
            if (sCor.Contains("SkyBlue"))
                return System.Drawing.Color.SkyBlue;
            if (sCor.Contains("Turquoise"))
                return System.Drawing.Color.Turquoise;
            if (sCor.Contains("Lime"))
                return System.Drawing.Color.Lime;
            if (sCor.Contains("Green"))
                return System.Drawing.Color.Green;
            if (sCor.Contains("Yellow"))
                return System.Drawing.Color.Yellow;
            if (sCor.Contains("Gold"))
                return System.Drawing.Color.Gold;
            if (sCor.Contains("Orange"))
                return System.Drawing.Color.Orange;
            if (sCor.Contains("Gray"))
                return System.Drawing.Color.Gray;
            if (sCor.Contains("Red"))
                return System.Drawing.Color.Red;
            if (sCor.Contains("Maroon"))
                return System.Drawing.Color.Maroon;
            return System.Drawing.Color.White;
        }


        public void KeyPress(ref TextBox sender, KeyPressEventArgs e)
        {

            if (e.KeyChar == '0')
                sender.Text.Insert(sender.Text.Length, "0");
            else if (e.KeyChar == '1')
                sender.Text.Insert(sender.Text.Length, "1");
            else if (e.KeyChar == '1')
                sender.Text.Insert(sender.Text.Length, "1");
            else if (e.KeyChar == '2')
                sender.Text.Insert(sender.Text.Length, "2");
            else if (e.KeyChar == '3')
                sender.Text.Insert(sender.Text.Length, "3");
            else if (e.KeyChar == '4')
                sender.Text.Insert(sender.Text.Length, "4");
            else if (e.KeyChar == '5')
                sender.Text.Insert(sender.Text.Length, "5");
            else if (e.KeyChar == '6')
                sender.Text.Insert(sender.Text.Length, "6");
            else if (e.KeyChar == '7')
                sender.Text.Insert(sender.Text.Length, "7");
            else if (e.KeyChar == '8')
                sender.Text.Insert(sender.Text.Length, "8");
            else if (e.KeyChar == '9')
                sender.Text.Insert(sender.Text.Length, "9");
            else if (e.KeyChar == ',')
                sender.Text.Insert(sender.Text.Length, ",");
            else if (Char.IsControl(e.KeyChar) == true)
                sender.Text.Insert(sender.Text.Length, e.KeyChar.ToString());
            else
                e.Handled = true;
        }

        public string formataData(DateTime dt)
        {
            string sAno = dt.Year.ToString();
            string sMes = "00" + dt.Month.ToString();
            sMes = sMes.Substring(sMes.Length-2,2);
            string sDia = "00" + dt.Day.ToString();
            sDia = sDia.Substring(sDia.Length -2,2);
            return sAno + "-" + sMes + "-" + sDia;
        }

    }
}
