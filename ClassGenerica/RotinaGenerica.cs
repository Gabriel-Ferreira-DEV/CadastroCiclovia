using System;
using System.Collections.Generic;
using System.Text;
using System.IO;

namespace ClassGenerica
{
    public class RotinaGenerica
    {

        public bool ValidaCNPJ(string cnpj)
        {
            int[] multiplicador1 = new int[12] { 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2 };
            int[] multiplicador2 = new int[13] { 6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2 };
            int soma;
            int resto;
            string digito;
            string tempCnpj;

            cnpj = cnpj.Trim();
            cnpj = cnpj.Replace(".", "").Replace("-", "").Replace("/", "");

            if (cnpj.Length != 14)
                return false;

            tempCnpj = cnpj.Substring(0, 12);

            soma = 0;
            for (int i = 0; i < 12; i++)
                soma += int.Parse(tempCnpj[i].ToString()) * multiplicador1[i];

            resto = (soma % 11);
            if (resto < 2)
                resto = 0;
            else
                resto = 11 - resto;

            digito = resto.ToString();

            tempCnpj = tempCnpj + digito;
            soma = 0;
            for (int i = 0; i < 13; i++)
                soma += int.Parse(tempCnpj[i].ToString()) * multiplicador2[i];

            resto = (soma % 11);
            if (resto < 2)
                resto = 0;
            else
                resto = 11 - resto;

            digito = digito + resto.ToString();

            return cnpj.EndsWith(digito);
        }

        public bool ValidaCPF(string cpf)
        {
            int[] multiplicador1 = new int[9] { 10, 9, 8, 7, 6, 5, 4, 3, 2 };
            int[] multiplicador2 = new int[10] { 11, 10, 9, 8, 7, 6, 5, 4, 3, 2 };
            string tempCpf;
            string digito;
            int soma;
            int resto;

            cpf = cpf.Trim();
            cpf = cpf.Replace(".", "").Replace("-", "");

            if (cpf.Length != 11)
                return false;

            tempCpf = cpf.Substring(0, 9);
            soma = 0;
            for (int i = 0; i < 9; i++)
                soma += int.Parse(tempCpf[i].ToString()) * multiplicador1[i];

            resto = soma % 11;
            if (resto < 2)
                resto = 0;
            else
                resto = 11 - resto;

            digito = resto.ToString();

            tempCpf = tempCpf + digito;

            soma = 0;
            for (int i = 0; i < 10; i++)
                soma += int.Parse(tempCpf[i].ToString()) * multiplicador2[i];

            resto = soma % 11;
            if (resto < 2)
                resto = 0;
            else
                resto = 11 - resto;

            digito = digito + resto.ToString();

            return cpf.EndsWith(digito);
        }

        //!Função: Checa Obrigatorio
        //!@param campo: Campo a ser verificado
        //!@param msg: Mensagem de Erro
        //!@param Error: ref string que receberá a msn
        //!@return bool: True - OK False - Falha
        /// <summary>
        /// Checa Obrigatorio
        /// </summary>
        /// <param name="campo">Campo a ser verificado</param>
        /// <param name="msg">Mensagem de Erro</param>
        /// <param name="Error">ref string que receberá a msn</param>
        /// <returns>True - OK False - Falha</returns>
        public bool ChecaObrigatorio(string campo, String msg, ref string Error)
        {
            if (campo.Trim().Length.Equals(0))
            {
                Error = "Campo Obrigatório: " + msg + "";
                return false;
            }
            else
            {
                return true;
            }
        }



        //!Função: Rotina que valida Inteiro
        //!@param campo: Campo a Ser validado
        //!@param msg: Mensagem de Erro
        //!@param Error: ref string que receberá a msn
        //!@return bool: True - OK False - Falha
        /// <summary>
        /// Rotina que valida Inteiro
        /// </summary>
        /// <param name="campo">Campo a Ser validado</param>
        /// <param name="msg">Mensagem de Erro</param>
        /// <param name="Error">ref string que receberá a msn</param>
        /// <returns>True - OK False - Falha</returns>
        public bool checaInteiro(string campo, string msg, ref string Error)
        {
            try
            {
                int n = Convert.ToInt32(campo);
                Error = string.Empty;
                return true;
            }
            catch
            {
                Error = msg + " - Somente Numero !";
                return false;
            }
        }

        public bool forceDir(string sCaminho)
        {
            bool bRet = false;
            try
            {
                string sNewDir = "";
                string sNewDirOld = "";
                string[] sPath = sCaminho.Split('\\');
                sNewDirOld = sPath[0];
                for (int i = 1; i < sPath.Length; i++)
                {
                    sNewDir = sNewDirOld + @"\" + sPath[i];
                    if (!(Directory.Exists(sNewDir)))
                    {
                        Directory.CreateDirectory(sNewDir);
                    }
                    sNewDirOld = sNewDir;
                }
                bRet = true;
            }
            catch (Exception e)
            {
                string sErro = e.Message;
                bRet = false;
            }
            return bRet;
        }


    }
}
