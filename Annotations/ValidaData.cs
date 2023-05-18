using System;
using System.ComponentModel.DataAnnotations;

namespace CadastrarAtletas.Annotations
{
    internal class ValidaData : RangeAttribute
    {
        public ValidaData() : base(typeof(DateTime), DateTime.Now.AddYears(-120).ToShortDateString().Replace("00:00:00", ""), DateTime.Now.ToShortDateString())
        {
        }
    }
}