using System;
using System.Diagnostics;
using System.Security.Cryptography;
using System.EnterpriseServices;
using System.Runtime.InteropServices;
using System.Reflection; // GAC
using System.IO;
using System.Text;

namespace ClsMD5
{

    public interface IMD5Sum
    {
        string ReadMd5(string arquivo);
        string StrMd5(string sString);
    }


    [ClassInterface(ClassInterfaceType.None)]
    public class MD5Sum : System.EnterpriseServices.ServicedComponent, IMD5Sum
    {
        public MD5Sum()
        {
        }

        public string StrMd5(string sString)
        {
            Byte[] bytRetorno;
            bytRetorno = StrToByteArray(sString);
            string sOrg;
            sOrg = MD5SUM(bytRetorno);
            return sOrg;
        }

        // C# to convert a string to a byte array.
        public static byte[] StrToByteArray(string str)
        {
            System.Text.ASCIIEncoding encoding = new System.Text.ASCIIEncoding();
            return encoding.GetBytes(str);
        }

        
        public string ReadMd5(string arquivo)
        {
            //Byte[] bytRetorno;
            //bytRetorno = LerArquivo(arquivo);
            //string sOrg;
            //sOrg = MD5SUM(bytRetorno);
            
            StringBuilder sb = new StringBuilder();
            FileStream fs = new FileStream(arquivo, FileMode.Open);
            MD5 md52 = new MD5CryptoServiceProvider();
            byte[] hash = md52.ComputeHash(fs);
            fs.Close();
            foreach (byte hex in hash) sb.Append(hex.ToString("x2"));
            string md5sum = sb.ToString();
            ///eOrg2.Text = md5sum.ToUpper();

            return md5sum;
        }

        private string MD5SUM(byte[] FileOrText) //Output: String<-> Input: Byte[] //
        {
            
            return BitConverter.ToString(new
            MD5CryptoServiceProvider().ComputeHash(FileOrText)).Replace("-", "").ToLower();
            
        }

        private byte[] LerArquivo(string nomerpt)
        {
            MemoryStream stream = new MemoryStream();
            try
            {
                string path = nomerpt;
                System.IO.FileStream fs = new System.IO.FileStream(path, FileMode.Open);
                int nBytes = Convert.ToInt32(fs.Length);
                byte[] ByteArray = new byte[nBytes];
                int nBytesRead = fs.Read(ByteArray, 0, nBytes);
                stream.Write(ByteArray, 0, nBytes);
                fs.Close();
            }
            catch (Exception exp)
            {
                string erro = exp.ToString();
            }
            return stream.GetBuffer();
        }
    }

}
