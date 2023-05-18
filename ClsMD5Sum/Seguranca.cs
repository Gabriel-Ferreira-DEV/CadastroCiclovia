using System;
using System.Security;
using System.Security.Cryptography;
using System.Text;
using System.Text.RegularExpressions;
using System.Collections;
using System.Management;
using System.Net;
using System.IO;
using System.Windows.Forms;
using System.Net.NetworkInformation;

namespace ClsMD5
{
    public static class HashFatores
    {
        static readonly Func<SHA1> ManagedSHA1 = () => new SHA1Managed(); //Modo gerenciado
        static readonly Func<SHA1> FipsSHA1 = () => new SHA1Cng();

        static readonly Func<SHA256> ManagedSHA256 = () => new SHA256Managed();
        static readonly Func<SHA256> FipsSHA256 = () => new SHA256Cng();

        static readonly Func<SHA512> ManagedSHA512 = () => new SHA512Managed();
        static readonly Func<SHA512> FipsSHA512 = () => new SHA512Cng();

        public static readonly Func<SHA1> SHA1 = System.Security.Cryptography.CryptoConfig.AllowOnlyFipsAlgorithms ? FipsSHA1 : ManagedSHA1;
        public static readonly Func<SHA256> SHA256 = System.Security.Cryptography.CryptoConfig.AllowOnlyFipsAlgorithms ? FipsSHA256 : ManagedSHA256;
        public static readonly Func<SHA512> SHA512 = System.Security.Cryptography.CryptoConfig.AllowOnlyFipsAlgorithms ? FipsSHA512 : ManagedSHA512;
    }

	/// <summary>
	/// Summary description for Security.
	/// </summary>
	public class SecurityCryDec
	{
		//*********************************************************************
		//
		// Security.Encrypt() Method
		//
		// The Encrypt method encrypts a clean string into a hashed string
		//
		//*********************************************************************
		public string Encrypt(string sDados)
		{
            Byte[] clearBytes = Encoding.UTF8.GetBytes(sDados);
			Byte[] hashedBytes = ((HashAlgorithm) CryptoConfig.CreateFromName("SHA256")).ComputeHash(clearBytes);
			string sRet = Convert.ToBase64String(hashedBytes);
            return sRet;
		}

        public string[] GetMACAddress()
        {
            string[] sMacAddress = new string[10];
            string[] sMacR = new string[10];
            try
            {
                NetworkInterface[] nics = NetworkInterface.GetAllNetworkInterfaces();
                int iMac = 0;
                foreach (NetworkInterface adapter in nics)
                {
                    string sMac = null;
                    IPInterfaceProperties properties = adapter.GetIPProperties();
                    sMac = adapter.GetPhysicalAddress().ToString();
                    if ((sMac != null) && (sMac != "") && (sMac.Length == 12))
                    {
                        sMacAddress[iMac] = sMac;
                        iMac++;
                    }
                }
                sMacR = new string[iMac];
                Array.Copy(sMacAddress, sMacR, iMac);
            }
            catch (Exception ex)
            {
                //atualizaLog("Erro: " + ex.Message);
            }
            return sMacR;
        }



        public string DigestAlgorithms(byte[] bMensagem)
        {

            System.Security.Cryptography.HashAlgorithm provider2 = HashFatores.SHA1();
            return Convert.ToBase64String(provider2.ComputeHash(bMensagem));
        }


        static string getOfflineInstallId()
        {
            //try
            //{
            //    ManagementScope Scope;
            //    Scope = new ManagementScope("\\\\.\\ROOT\\cimv2");
            //    Scope.Connect();
            //    ObjectQuery Query = new ObjectQuery("SELECT OfflineInstallationId FROM SoftwareLicensingProduct");
            //    ManagementObjectSearcher Searcher = new ManagementObjectSearcher(Scope, Query);

            //    foreach (ManagementObject WmiObject in Searcher.Get())
            //    {
            //        if (WmiObject["OfflineInstallationId"] != null)
            //            return WmiObject["OfflineInstallationId"].ToString();
            //    }
            //}
            //catch
            //{
            //    return System.Security.Principal.WindowsIdentity.GetCurrent().Name.ToString();
            //}
            //return "softhipesquisatnw";
            return System.Security.Principal.WindowsIdentity.GetCurrent().Name.ToString();
        }


        public bool validaApp()
        {
            string sNome = System.Security.Principal.WindowsIdentity.GetCurrent().Name.ToString();
            bool bAchou = false;
            string[] sMac = GetMACAddress();
            if (File.Exists(@".\ApiVirtEngine.dll"))
            {
                StreamReader str = new StreamReader(@".\ApiVirtEngine.dll");
                string sID = DigestAlgorithms(Encoding.UTF8.GetBytes(getOfflineInstallId()));
                string sIDRef = str.ReadLine();
                if (sID != sIDRef)
                {
                    MessageBox.Show("Sistema não Licenciado...", "Softhi HardKe Cod: 0", MessageBoxButtons.OK, MessageBoxIcon.Error);
                    return false;
                }

                string sMacr = str.ReadLine();
                if (sMacr == "")
                    sMacr = str.ReadLine();
                string[] bMacr = sMacr.Split('#');
                try
                {
                    for (int i = 0; i < bMacr.Length; i++)
                    {
                        for (int ix = 0; ix < sMac.Length; ix++)
                        {
                            if (sMac[ix] != null)
                            {
                                string sHash = DigestAlgorithms(Encoding.UTF8.GetBytes(sMac[ix]));
                                if (sHash == bMacr[i])
                                {
                                    bAchou = true;
                                    break;
                                }
                            }
                        }
                        if (bAchou)
                            break;
                    }
                }
                catch (Exception ex)
                {
                    MessageBox.Show("Sistema não Licenciado...", "Softhi HardKe Cod: 1", MessageBoxButtons.OK, MessageBoxIcon.Error);
                    return false;
                }

                if (!bAchou)
                {
                    MessageBox.Show("Sistema não Licenciado...", "Softhi HarKey Cod: 2", MessageBoxButtons.OK, MessageBoxIcon.Error);
                    return false;
                }
            }
            else
            {
                MessageBox.Show("Sistema não Licenciado...", "Softhi Hardkey Cod: 3", MessageBoxButtons.OK, MessageBoxIcon.Error);
                return false;
            }
            return true;
        }

	}
}
