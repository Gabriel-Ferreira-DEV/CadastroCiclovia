using System;
using Dungphan.Hannigan.Security.Cryptography;
using System.Diagnostics;
using System.Security.Cryptography;
using System.Runtime.InteropServices;
using System.Text;
using System.IO;
using System.Drawing;

namespace ClsMD5
{
    /// <summary>
    /// Summary description for Class1.
    /// Classe intemediária para o Dllcryptolib
    /// ESta classe irá simplificar os métodos p/ cryptografia e decryptografia
    /// 
    /// </summary>
    /// 
 //   [Guid("CEAEEA1A-4EE7-4c5b-882D-C97DF9EFFC75")]
    //public interface ICryDecry
    //{
    //    // Encrypt String
    //    string Encrypt(string sString);
        
    //    //nTp => 0 = Encrypt e 1 =Decrypta usá chave fixa
    //    string CryDec(string txt, int nTp);

    //    //arq = arquivo chave usar chaves em XML
    //    string CryDecXml(string txt, string arq, int nTp);
    //    //arq = arquivo chave usar chaves em TXT
    //    string CryDecTxt(string txt, string arq, int nTp);

    //    string CryDecXml(string txt, int nTp);
    //    //arq = arquivo chave usar chaves em TXT
    //    string CryDecTxt(string txt, int nTp);
    //    // gera chaves Formato XML publica e privada

    //    // gera chaves Formato XML publica e privada
    //    bool GeraXmlKey(string arq);
    //    // gera chaves Formato TXT publica e privada
    //    bool GeraTxtKey(string arq);

    //}


    //[Guid("9855EB8D-EC5A-4c5d-ACB0-156C46206C43")]
    [ClassInterface(ClassInterfaceType.None)]
    public class CryDecry //: System.EnterpriseServices.ServicedComponent, ICryDecry
    {
        public CryDecry()
        {
            //
            // TODO: Add constructor logic here
            //
        }

        // Encrypt String
        public string Encrypt(string sString)
        {
            Byte[] clearBytes = new UnicodeEncoding().GetBytes(sString);
            Byte[] hashedBytes = ((HashAlgorithm)CryptoConfig.CreateFromName("SHA256")).ComputeHash(clearBytes);
            return BitConverter.ToString(hashedBytes);
        }
        
        
        public bool GeraXmlKey(string arq)
        {
            CryptoAsymmetric obj = new CryptoAsymmetric();
            obj.SaveXMLPrivateKey_toFile("../KeyXml/pri" + arq + ".xml");
            obj.SaveXMLPublicKey_toFile("../KeyXml/pub" + arq + ".xml");
            return true;
        }

        public bool GeraXmlKeyAsy(string arq)
        {
            CryptoAsymmetric obj = new CryptoAsymmetric();
            obj.SaveXMLPrivateKey_toFile(arq + "pri.xml");
            obj.SaveXMLPublicKey_toFile(arq + "pub.xml");
            return true;
        }


        public bool GeraKeySym(string arq)
        {
            CryptoSymmetric objsym = new CryptoSymmetric(new TripleDESCryptoServiceProvider());
            objsym.SaveIV_toFile(@".\" + arq + ".Pri");
            objsym.SaveKey_toFile(@".\" + arq + ".Pub");
            return true;
        }

        public bool Cryptografa(string Arquivo)
        {
            CryptoAsymmetric obj = new CryptoAsymmetric();
            
            CryptoSymmetric objsym = new CryptoSymmetric(new TripleDESCryptoServiceProvider());
            string sDestino = Arquivo.Substring(0, Arquivo.Length - 3) + "cry";
            //obj.CreateSignatureForFile(
            objsym.EncryptFile("emtAW6pgZng=", "u+df0xY/az8rRl12+k7VmGLe8NM5bJAn", Arquivo, sDestino);
            return true;
        }

        public bool DecCryptografa(string Arquivo)
        {
            CryptoSymmetric objsym = new CryptoSymmetric(new TripleDESCryptoServiceProvider());
            string sDestino = Arquivo.Substring(0, Arquivo.Length - 3) + "cry";
            objsym.DecryptFile("emtAW6pgZng=", "u+df0xY/az8rRl12+k7VmGLe8NM5bJAn", Arquivo, sDestino);
            return true;
        }


        public bool GeraTxtKey(string arq)
        {
            CryptoSymmetric objsym = new CryptoSymmetric(new TripleDESCryptoServiceProvider());
            objsym.SaveIV_toFile("./KeyTxt/Iv" + arq + ".txt");
            objsym.SaveKey_toFile("./KeyTxt/Key" + arq + ".txt");
            return true;
        }
        // metodo com chaves internas
        public string CryDec(string txt, int nTp)
        {
            CryptoSymmetric objsym = new CryptoSymmetric(new TripleDESCryptoServiceProvider());
            string s2;
            string s3;
            if (txt.Trim().Length > 0)
            {
                string s1 = txt.Trim();
                if (txt.Trim().Length > 0)
                {
                    if (nTp == 0) //Encrypta
                    {
                        s2 = objsym.EncryptString("emtAW6pgZng=", "u+df0xY/az8rRl12+k7VmGLe8NM5bJAn", s1);
                        s3 = objsym.DecryptString("emtAW6pgZng=", "u+df0xY/az8rRl12+k7VmGLe8NM5bJAn", s2);
                    }
                    else //Decrypta
                    {
                        s2 = objsym.DecryptString("emtAW6pgZng=", "u+df0xY/az8rRl12+k7VmGLe8NM5bJAn", s1);
                        s3 = objsym.EncryptString("emtAW6pgZng=", "u+df0xY/az8rRl12+k7VmGLe8NM5bJAn", s2);
                    }
                    if (s1 != s3)
                        Debug.Assert(false);
                }
                else
                {
                    s2 = txt;
                }
            }
            else
            {
                s2 = txt;
            }
            return s2;
        }

        public string CryDecTxt(string txt, string arq, int nTp)
        {
            CryptoSymmetric objsym = new CryptoSymmetric(new TripleDESCryptoServiceProvider());
            string s1 = txt.Trim();
            string s2;
            string s3;
            if (nTp == 0) //Encrypta
            {
                s2 = objsym.EncryptString_fromFile("../KeyTxt/Iv" + arq + ".txt", "../KeyTxt/Key" + arq + ".txt", s1);
                s3 = objsym.DecryptString_fromFile("../KeyTxt/Iv" + arq + ".txt", "../KeyTxt/Key" + arq + ".txt", s2);
            }
            else //Decrypta
            {
                s2 = objsym.DecryptString_fromFile("../KeyTxt/Iv" + arq + ".txt", "../KeyTxt/Key" + arq + ".txt", s1);
                s3 = objsym.EncryptString_fromFile("../KeyTxt/Iv" + arq + ".txt", "../KeyTxt/Key" + arq + ".txt", s2);
            }
            if (s1 != s3)
                Debug.Assert(false);
            return s2;
        }

        public string CryDecTxt(string txt, int nTp)
        {
            CryptoSymmetric objsym = new CryptoSymmetric(new TripleDESCryptoServiceProvider());
            string s1 = txt.Trim();
            string s2;
            string s3;
            if (nTp == 0) //Encrypta
            {
                s2 = objsym.EncryptString_fromFile("./KeyTxtIv.txt", "./KeyTxtPub.txt", s1);
                s3 = objsym.DecryptString_fromFile("./KeyTxtIv.txt", "./KeyTxtPub.txt", s2);
            }
            else //Decrypta
            {
                s2 = objsym.DecryptString_fromFile("./KeyTxtIv.txt", "./KeyTxtPub.txt", s1);
                s3 = objsym.EncryptString_fromFile("./KeyTxtIv.txt", "./KeyTxtPub.txt", s2);
            }
            if (s1 != s3)
                Debug.Assert(false);
            return s2;
        }

        public string CryDecXml(string txt, string arq, int nTp)
        {
            CryptoAsymmetric obj = new CryptoAsymmetric();
            string s1 = txt.Trim();
            string s2;
            string s3;
            if (nTp == 0) //Encrypta
            {
                s2 = obj.EncryptString_fromFile("../KeyXml/pub" + arq + ".xml", s1);
                s3 = obj.DecryptString_fromFile("../KeyXml/pri" + arq + ".xml", s2);
            }
            else //Decrypta
            {
                s2 = obj.DecryptString_fromFile("../KeyXml/pri" + arq + ".xml", s1);
                s3 = obj.EncryptString_fromFile("../KeyXml/pub" + arq + ".xml", s2);
            }
            if (s1 != s3)
                Debug.Assert(false);
            return s2;
        }
 
        public string CryDecXml(string txt, int nTp)
        {
            CryptoAsymmetric obj = new CryptoAsymmetric();
            string s1 = txt.Trim();
            string s2;
            string s3;
            if (nTp == 0) //Encrypta
            {
                s2 = obj.EncryptString_fromFile("./KeyXmlpub.xml", s1);
                s3 = obj.DecryptString_fromFile("./KeyXmlpri.xml", s2);
            }
            else //Decrypta
            {
                s2 = obj.DecryptString_fromFile("./KeyXmlpri.xml", s1);
                s3 = obj.EncryptString_fromFile("./KeyXmlpub.xml", s2);
            }
            if (s1 != s3)
                Debug.Assert(false);
            return s2;
        }

        public bool AssinaturaDig(string Arquivo, bool bCopia)
        {
           string sXmlAssingura = "<RSAKeyValue><Modulus>0CA3KXfVrcwmikR6Meji7WLf4fp4sFxf1aolXwNxJKEWbh59gM/8Rl+KkT1nUrE0YMs9rb4BH9SR14zdnrAJxiOMkYMyWOiYEeZBGz3WDvyIhelNubD+WZdEBhW7oeE161ZfX7WvOX2Tkr1AnecFaeUq/7fStG4tR7mEkeS3ZUs=</Modulus><Exponent>AQAB</Exponent><P>8cuRNjyPN1iXD2hT1qpVThODvnS3Y+rjDmenDBGi2l8EloIZrAiKCwWsd2BSD+fMqy+dgfoWXQ7V4Sf1EJGnQw==</P><Q>3FpI2JI80BxlS1n3MzvC4H6/HKeftxEuszN1MchduEgAIS7OJkE4AdoQKTh+Dud2XnzKqDuojlTWPcvV0BlVWQ==</Q><DP>yhMZ+dzkyBl2rb7ACnByOH0gpmQ++/dK6TgBKJn4o02ztOFn+Rlt3MZSG7ZY/sf3ib2SghTy6bTDVJejPMStpw==</DP><DQ>y3sX/93zCF7gb1fRvd7202ZXxvdHtr7IODVRiLo1SWI7tGjLd2oMdTFQcTA4wDygAxsL7ZTBz0WqXYBonnV2aQ==</DQ><InverseQ>QbwPjNyQsQOZFu8N9vJlLm5FfGY9Tqa3YLjvDLGo/mp2457f42Bt7vyDgfwhCH3pYGDUVbnJZhL3hTiShiGI0w==</InverseQ><D>jHvCYEZYQIkV1qzkQn4tdwkPkAyunHSt556CvUCohY4Kgugn1OQPKD1jXigxbxrX/SITDwy6245zpyiZi3zOCu2OePSiIbzyHp/bSJRWPKTHvnl9EkupXG23J6klzuklAjxIDfq7ScUUTslm5ztmehIcwBXBxeKzTUomwX9VFPE=</D></RSAKeyValue>";
           try
           {
               string sDestino = Arquivo.Substring(0, Arquivo.Length - 5) + "B.jpg";
               Bitmap bmp = new Bitmap(Arquivo);
               if (bCopia)
                   bmp.Save(sDestino, System.Drawing.Imaging.ImageFormat.Jpeg);
               byte[] byImg = imageToByteArray((Image)bmp);
               CryptoAsymmetric obj = new CryptoAsymmetric();
               string Assinatura = obj.CreateSignatureForContent(sXmlAssingura, byImg);
               byte[] byImg2 = new byte[Assinatura.Length];
               for (int i = 0; i < Assinatura.Length; i++)
               {
                   byImg2[i] += (byte)Assinatura[i];
               }
               byte[] bt2 = new byte[byImg.Length + byImg2.Length];
               for (int i = 0; i < bt2.Length; i++)
               {
                   if (i < byImg.Length)
                       bt2[i] = byImg[i];
                   else
                       bt2[i] = byImg2[i - byImg.Length];
               }
               BinaryWriter bnw = new BinaryWriter(File.Open(sDestino, FileMode.Create));
               bnw.Write(bt2);
               bnw.Close();

               //Image img = byteArrayToImage(byImg, byImg2);
               //img.Save(@"C:\Temp\Teste.Jpg");
               //CreateSignatureForFile(sXmlAssingura, Arquivo);
               return true;
           }
           catch (Exception ex)
           {
               return false;
           }
        }

        public bool ValidaAssinaturaDig(string Arquivo, string assinatura)
        {
            string sXmlAssingura = "<RSAKeyValue><Modulus>0CA3KXfVrcwmikR6Meji7WLf4fp4sFxf1aolXwNxJKEWbh59gM/8Rl+KkT1nUrE0YMs9rb4BH9SR14zdnrAJxiOMkYMyWOiYEeZBGz3WDvyIhelNubD+WZdEBhW7oeE161ZfX7WvOX2Tkr1AnecFaeUq/7fStG4tR7mEkeS3ZUs=</Modulus><Exponent>AQAB</Exponent><P>8cuRNjyPN1iXD2hT1qpVThODvnS3Y+rjDmenDBGi2l8EloIZrAiKCwWsd2BSD+fMqy+dgfoWXQ7V4Sf1EJGnQw==</P><Q>3FpI2JI80BxlS1n3MzvC4H6/HKeftxEuszN1MchduEgAIS7OJkE4AdoQKTh+Dud2XnzKqDuojlTWPcvV0BlVWQ==</Q><DP>yhMZ+dzkyBl2rb7ACnByOH0gpmQ++/dK6TgBKJn4o02ztOFn+Rlt3MZSG7ZY/sf3ib2SghTy6bTDVJejPMStpw==</DP><DQ>y3sX/93zCF7gb1fRvd7202ZXxvdHtr7IODVRiLo1SWI7tGjLd2oMdTFQcTA4wDygAxsL7ZTBz0WqXYBonnV2aQ==</DQ><InverseQ>QbwPjNyQsQOZFu8N9vJlLm5FfGY9Tqa3YLjvDLGo/mp2457f42Bt7vyDgfwhCH3pYGDUVbnJZhL3hTiShiGI0w==</InverseQ><D>jHvCYEZYQIkV1qzkQn4tdwkPkAyunHSt556CvUCohY4Kgugn1OQPKD1jXigxbxrX/SITDwy6245zpyiZi3zOCu2OePSiIbzyHp/bSJRWPKTHvnl9EkupXG23J6klzuklAjxIDfq7ScUUTslm5ztmehIcwBXBxeKzTUomwX9VFPE=</D></RSAKeyValue>";
            try
            {
                CryptoAsymmetric obj = new CryptoAsymmetric();
                if (assinatura == "")
                    assinatura = imageToAssinatura(Arquivo);
                Bitmap bmp = new Bitmap(Arquivo);
                byte[] byImg = imageToByteArray((Image)bmp);
                bmp.Dispose();
            return obj.VerifySignatureOfContent(sXmlAssingura, assinatura, byImg);
            }
            catch { return false; }
        }

        public byte[] imageToByteArray(Image imageIn)
        {
            MemoryStream ms = new MemoryStream();
            imageIn.Save(ms, System.Drawing.Imaging.ImageFormat.Jpeg);
            return ms.ToArray();
        }

        public string imageToAssinatura(string Arquivo)
        {
            BinaryReader bnw = new BinaryReader(File.Open(Arquivo, FileMode.Open));
            byte[] byAss = new byte[bnw.BaseStream.Length];
            bnw.Read(byAss, 0, byAss.Length);
            bnw.Close();
            string sAssinatura = "";
            int nTam = byAss.Length - 172;
            for (int i = 0; i < 172; i++)
            {
                sAssinatura += Convert.ToChar(byAss[nTam + i]);
            }
            return sAssinatura;
        }


        public Image byteArrayToImage(byte[] byteArrayIn, byte[] byImg2)
        {
            try
            {
                byte[] bt2 = new byte[byteArrayIn.Length + byImg2.Length];
                for (int i = 0; i < bt2.Length; i++)
                {
                    if (i < byteArrayIn.Length)
                        bt2[i] = byteArrayIn[i];
                    else
                        bt2[i] = byImg2[i - byteArrayIn.Length];
                    
                }
                MemoryStream ms = new MemoryStream(byteArrayIn);
                MemoryStream ms2 = new MemoryStream(bt2);
                Image returnImage = Image.FromStream(ms2);
                //returnImage.Save(@"C:\Temp\Teste.Jpg");
                return returnImage;
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public Image byteArrayToImage(byte[] byteArrayIn)
        {
            MemoryStream ms = new MemoryStream(byteArrayIn);
            Image returnImage = Image.FromStream(ms);
            return returnImage;
        }
    }
}