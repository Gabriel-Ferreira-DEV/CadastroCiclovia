using CadastrarAtletas.Model;
using System;
using System.Windows.Forms;

namespace CadastrarAtletas.View
{
    public partial class FrmEditarTag : Form
    {
        Atleta atleta = new Atleta();
        string Id = "";

        BindingSource Dados = new BindingSource();
        Messagens.ClsMessagens Clmsg = new Messagens.ClsMessagens();

        public FrmEditarTag(string id, BindingSource bdsDados)
        {
            InitializeComponent();
            Id = id;
            Dados = bdsDados;

        }

        private void txtEditaTag_TextChanged(object sender, EventArgs e)
        {
            btnNovaTag.Enabled = true;
        }

        private void btnNovaTag_Click(object sender, EventArgs e)
        {
            if (txtEditaTag.Text.Trim() != "")
            {
                string sParam = "'" + txtEditaTag.Text.Trim() + "','" + Id + "','" + txtObs.Text.Trim() + "'";

                bool bRetorno =  atleta.EditarTags(sParam,Dados);
                 
                if(bRetorno == true)
                {
                    this.Close();
                }
                else
                {
                    txtEditaTag.Text = "";
                    txtObs.Text = "";
                    btnNovaTag.Enabled = false;
                    txtEditaTag.Select();
                    return;
                }
                //Thread thread = new Thread(() => { Application.Run(new FrmCadCorredores()); });
                //thread.ApartmentState = ApartmentState.STA;
                //thread.Start();
            }
            else
            {
                Clmsg.frmA.sMsg ="Campo Tag Obrigatorio";
                if (!Clmsg.frmP.bConf)
                {
                  //  dtgDados.Enabled = true;
                    return;
                }
            }

        }

        private void btnCancelar_Click(object sender, EventArgs e)
        {
   
            this.Close();       
        }

        private void FmrEditarTag_Load(object sender, EventArgs e)
        {
            txtEditaTag.Select();
        }

        private void txtObs_TextChanged(object sender, EventArgs e)
        {

        }

        private void FrmEditarTag_Enter(object sender, EventArgs e)
        {
        
        }

        private void btnNovaTag_Click_1(object sender, EventArgs e)
        {
            if (txtEditaTag.Text.Trim() != "")
            {
                string sParam = "'" + txtEditaTag.Text.Trim() + "','" + Id + "','" + txtObs.Text.Trim() + "'";

                bool bRetorno = atleta.EditarTags(sParam, Dados);

                if (bRetorno == true)
                {
                    this.Close();
                }
                else
                {
                    txtEditaTag.Text = "";
                    txtObs.Text = "";
                    btnNovaTag.Enabled = false;
                    txtEditaTag.Select();
                    return;
                }
                //Thread thread = new Thread(() => { Application.Run(new FrmCadCorredores()); });
                //thread.ApartmentState = ApartmentState.STA;
                //thread.Start();
            }
            else
            {
                Clmsg.frmA.sMsg = "Campo Tag Obrigatorio";
                if (!Clmsg.frmP.bConf)
                {
                    //  dtgDados.Enabled = true;
                    return;
                }
            }
        }
    }
}
