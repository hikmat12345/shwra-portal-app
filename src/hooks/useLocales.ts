import { useTranslation } from 'react-i18next';
import { arEG } from '@mui/material/locale';

const LANGS = [

  {

    label: 'Arabic',
    value: 'ar',
    systemValue: arEG,
    icon: '/static/icons/ic_flag_ar.svg'

  },

];

export default function useLocales() {
  const { i18n, t: translate } = useTranslation();
  const langStorage = localStorage.getItem('i18nextLng');
  const currentLang = LANGS.find((_lang) => _lang.value === langStorage) || LANGS[0];

  const handleChangeLanguage = (newlang: string) => {
    i18n.changeLanguage(newlang);
  };

  return {
    onChangeLang: handleChangeLanguage,
    translate,
    currentLang,
    allLang: LANGS
  };
}
