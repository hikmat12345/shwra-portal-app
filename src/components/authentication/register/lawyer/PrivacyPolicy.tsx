import { Fragment } from 'react';
// material
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  Box,
  Link,
  Typography,
  TableCell,
  TableBody,
  TableRow,
  TableHead,
  TableContainer,
  Table
} from '@mui/material';
// hooks
import useDialog from '../../../../hooks/useDialog';
// components
import {
  Document,
  DocumentTitle,
  DocumentBlock,
  DocumentList,
  DocumentListItem
} from '../../../content';
// ----------------------------------------------------------------------

export default function PrivacyPolicy() {
  const { open, openDialog, closeDialog } = useDialog();

  const handleClose = () => {
    closeDialog();
  };

  const handleOpen = () => {
    openDialog();
  };

  return (
    <Fragment>
      <Link underline="always" color="text.primary" onClick={handleOpen}>
        سياسة الخصوصية
      </Link>

      <Dialog
        open={open}
        onClose={handleClose}
        scroll="paper"
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">سياسة الخصوصية</DialogTitle>
        <DialogContent dividers={true}>
          <DialogContentText>
            <Document>
              <DocumentBlock>
                <Typography>
                  {`   نلتزم نحن، في شورى بشدة بالتحلي بالشفافية، ونود منك فهم طريقة جمع معلوماتك، وطريقة
                  استخدامها، ومشاركتها، وحمايتها. تحدد سياسة الخصوصية هذه ("سياسة الخصوصية") طريقة
                  تعامل شورى مع المعلومات المتعلقة باستخدام الخدمات المتاحة على المنصة؛ ووقت تفاعلك
                  معنا. توضح هذه السياسة أيضًا، على وجه التحديد، ممارسات البيانات الخاصة بنا
                  المتعلقة بتقديم الخدمات. نحتفظ بالحق في تغيير سياسة الخصوصية هذه من وقت لآخر. إذا
                  أجرت شورى تغييراتٍ على سياسة الخصوصية هذه، سيتم توفير سياسة الخصوصية المُحدثة من
                  خلال خدماتنا وإذا أجرينا أي تغييرات كبيرة على سياسة الخصوصية هذه، سنرسل إشعارًا
                  على حسابك لدى المنصة وقد نتواصل أيضًا بك مباشرة عبر البريد الإلكتروني أو بطريقة
                  أخرى.`}
                </Typography>
              </DocumentBlock>
              <DocumentBlock>
                <DocumentTitle>أنواع المعلومات التي نجمعها</DocumentTitle>
                <DocumentList>
                  <DocumentListItem>
                    نجمع المعلومات أو نتلقاها بطرق مختلفة. وتعتمد أنواع المعلومات التي نجمعها أو
                    نتلقاها على كيفية استخدامك لخدماتنا والتفاعل معها. وفي العديد من الحالات، يمكنك
                    اختيار المعلومات التي تقدمها لنا، على الرغم من أن بعض المعلومات (مثل معلومات
                    الحساب) لازمة بالنسبة لنا لتقديم الخدمات، وإذا لم يتم تقديمها، فلن نتمكن من
                    تقديم الخدمات. نستخدم هذه المعلومات ونفصح عنها للأغراض الموضحة أدناه. تتضمن
                    أنواع المعلومات التي نجمعها:
                  </DocumentListItem>
                  <DocumentListItem>
                    <p
                      style={{
                        display: 'flex'
                      }}
                    >
                      {' '}
                      <span style={{ marginLeft: '5px' }}>• </span>
                      <span>
                        {`معلومات الحساب مثل اسمك وعنوان بريدك الإلكتروني ورقم هاتفك وتاريخ ميلادك وجنسك وتفاصيل عنوانك وكذلك تفاصيل الشهادة الجامعية وشهادة مزاولة مهنة المحاماة أيضًا أرقام بطاقة الهوية الصادرة عن الحكومة.`}{' '}
                      </span>
                    </p>{' '}
                  </DocumentListItem>
                  <DocumentListItem>
                    <p
                      style={{
                        display: 'flex'
                      }}
                    >
                      {' '}
                      <span style={{ marginLeft: '5px' }}>• </span>
                      <span>
                        {`عندما تطلب الحصول على خدمة أو دعم العملاء أو مساعدة أخرى مقدمة للعملاء، يمكنك اختيار تزويدنا بمعلومات الاتصال الخاصة بك حتى نتمكن من الرد على طلباتك على أفضل نحو، وقد نحتفظ بمعلومات حول مشاركتك في خدمات الدعم الخاصة بنا.`}{' '}
                      </span>
                    </p>{' '}
                  </DocumentListItem>
                  <DocumentListItem>
                    <p
                      style={{
                        display: 'flex'
                      }}
                    >
                      {' '}
                      <span style={{ marginLeft: '5px' }}>• </span>
                      <span>
                        {`تجمع شورى والأطراف الثالثة (مثل: فيسبوك، إنستجرام، .....) المعلومات من المستعرض أو الحاسوب أو الجهاز الجوال الخاص بك، حيث تزودنا بمعلومات فنية، مثل: عنوان بروتوكول الإنترنت لمصدر جهازك وموعد وصولك للخدمات أو استخدامك لها. نستخدم ملفات تعريف الارتباط وتقنيات تتبع مماثلة لتقديم خدماتنا، بما في ذلك حماية أمان الخدمة وتذكر إعداداتك وجمع معلومات تحليلية عنك. ويجوز للأطراف الثالثة استخدام المعلومات الفنية لتقديم خدمات القياس والإعلانات المستهدفة. `}{' '}
                      </span>
                    </p>{' '}
                  </DocumentListItem>
                  <DocumentListItem>
                    <p
                      style={{
                        display: 'flex'
                      }}
                    >
                      {' '}
                      <span style={{ marginLeft: '5px' }}>• </span>
                      <span>
                        {` نتلقى معلومات عنك عندما نستعين بشركاء طرف ثالث مثل شركاء التسويق والإعلان وكذلك شبكات التواصل الاجتماعي.`}
                      </span>
                    </p>{' '}
                  </DocumentListItem>
                </DocumentList>
              </DocumentBlock>

              <DocumentBlock>
                <DocumentTitle>كيف نستخدم المعلومات</DocumentTitle>
                <DocumentList>
                  <DocumentListItem>{`تقديم الخدمات لك بناءً على طلبك،`}</DocumentListItem>
                  <DocumentListItem>
                    <p
                      style={{
                        display: 'flex'
                      }}
                    >
                      {' '}
                      <span style={{ marginLeft: '5px' }}>• </span>
                      <span>{`معالجة المدفوعات أو الاشتراكات وأي خصومات أو عروض خاصة،`} </span>
                    </p>{' '}
                  </DocumentListItem>
                  <DocumentListItem>
                    <p
                      style={{
                        display: 'flex'
                      }}
                    >
                      {' '}
                      <span style={{ marginLeft: '5px' }}>• </span>
                      <span>
                        {`التواصل معك فيما يتعلق بحسابك أو تفاعلاتك أو تعاملاتك، بما في ذلك الإعلانات المتعلقة بالخدمات، مثل التغييرات التي تطرأ على سياساتنا. حسبما تسمح الأنظمـة واللوائـح والسياسـات المعمـول بهـا فـي المملكـة العربية السعودية، قد نرسل إليك أيضًا استبيانات أو اتصالات تسويقية نيابة عن شورى و/أو أطراف ثالثة، بما في ذلك معلومات عن الميزات والتحسينات التي يتم إدخالها على خدماتنا،`}{' '}
                      </span>
                    </p>{' '}
                  </DocumentListItem>
                  <DocumentListItem>
                    <p
                      style={{
                        display: 'flex'
                      }}
                    >
                      {' '}
                      <span style={{ marginLeft: '5px' }}>• </span>
                      <span>
                        {`تعزيز خدماتنا وتطويرها وتحسينها، لتحقيق هذا الغرض، يمكننا الاستعانة بمقدمي خدمات التحليلات والإحصاءات من أطراف ثالثة لفهم كيفية استخدام الخدمة ومساعدتنا في تحسين الخدمات،`}{' '}
                      </span>
                    </p>{' '}
                  </DocumentListItem>
                  <DocumentListItem>
                    <p
                      style={{
                        display: 'flex'
                      }}
                    >
                      {' '}
                      <span style={{ marginLeft: '5px' }}>• </span>
                      <span>
                        {`الامتثال، عند الاقتضاء، لالتزاماتنا القانونية بما في ذلك تلبية المتطلبات الخاصة بالأنظمة السعودية،`}
                      </span>
                    </p>{' '}
                  </DocumentListItem>
                  <DocumentListItem>
                    <p
                      style={{
                        display: 'flex'
                      }}
                    >
                      {' '}
                      <span style={{ marginLeft: '5px' }}>• </span>
                      <span>
                        {`الكشف عن والتحقيق في ومنع الأنشطة التي قد تنتهك سياسات شورى أو أحكام وشروط الاستخدام أو التي تكون غير قانونية`}
                      </span>
                    </p>{' '}
                  </DocumentListItem>
                  <DocumentListItem>
                    <p
                      style={{
                        display: 'flex'
                      }}
                    >
                      {' '}
                      <span style={{ marginLeft: '5px' }}>• </span>
                      <span>
                        {`مشاركة والتعاون مع أطراف ثالثة، كما هو موضح في قسم "مع مَن نشارك معلوماتك؟" الوارد أدناه`}
                      </span>
                    </p>{' '}
                  </DocumentListItem>
                </DocumentList>
              </DocumentBlock>

              <DocumentBlock>
                <DocumentTitle>مع مَن نشارك معلوماتك؟</DocumentTitle>
                <DocumentList>
                  <DocumentListItem>{`نشارك معلوماتك مع الشركات التابعة لشورى (إن وجدت)، ومقدمي الخدمات لدينا وأطراف ثالثة أخرى، عند الاقتضاء، لتنفيذ أحكام وشروط الاستخدام وعلى النحو المبين في إشعار الخصوصية هذا. نشارك معلوماتك، على وجه الخصوص، مع:`}</DocumentListItem>
                  <DocumentListItem>
                    <p
                      style={{
                        display: 'flex'
                      }}
                    >
                      {' '}
                      <span style={{ marginLeft: '5px' }}>• </span>
                      <span>
                        {`مقدمو الخدمات والشركاء لدينا: نشارك معلوماتك مع مقدمي الخدمات والشركاء الموثوق بهم وموظفيهم الذين يقدمون خدمات إلى شورى مثل بيانات الاستضافة والبنية التحتية الخاصة بنا أو تقديم خدمات التحقق من الهوية، أو معالجة المدفوعات ،أو دعم وتحسين الخدمات أو تنفيذ خدمة العملاء أو تقديم خدمات التسويق والإعلان.`}{' '}
                      </span>
                    </p>{' '}
                  </DocumentListItem>
                  <DocumentListItem>
                    <p
                      style={{
                        display: 'flex'
                      }}
                    >
                      {' '}
                      <span style={{ marginLeft: '5px' }}>• </span>
                      <span>
                        {`التعاون مع أطراف ثالثة: بعد إزالة بعض المُعرّفات، مثل اسمك ورقم هاتفك وعنوان بريدك الإلكتروني (عند تقديمه) وجمع المعلومات الناتجة مع معلومات مماثلة مقدمة من مستخدمين آخرين، قد تقوم شورى باستخدام معلوماتك وترخيصها ومشاركتها، بما في ذلك سجلات المكالمات.`}{' '}
                      </span>
                    </p>{' '}
                  </DocumentListItem>
                  <DocumentListItem>
                    <p
                      style={{
                        display: 'flex'
                      }}
                    >
                      {' '}
                      <span style={{ marginLeft: '5px' }}>• </span>
                      <span>
                        {`الجهات الحكومية والتنظيمية وجهات إنفاذ القانون: يجوز لنا مشاركة معلوماتك إذا اعتقدنا بحسن نية أنه من الضروري على نحوٍ معقول مشاركتها لأسباب قانونية، بما يشمل تلبية المتطلبات المتعلقة بالأنظمـة واللوائـح والسياسـات المعمـول بهـا فـي المملكة العربية السعودية، أو كجزء من عملية قضائية، أو للكشف عن نشاط احتيالي وأي نشاط غير قانوني آخر والمشاكل الأمنية أو الفنية والتحقيق في تلك الأنشطة والتحقيق فيها ومنع وقوعها والتعامل معها، أو لمنع إلحاق أي ضرر أو إصابة بك أو بالعملاء أو موظفينا أو أطراف ثالثة أخرى أو أنفسنا؛ أو إذا كنا بحاجة إلى مشاركة تلك المعلومات للدفاع عن حقوقنا القانونية أو ممتلكاتنا، أو اتخاذ إجراءات تتعلق بأنشطة غير قانونية، أو لإنفاذ العقود التي نبرمها، مثل أحكام وشروط الاستخدام.`}{' '}
                      </span>
                    </p>{' '}
                  </DocumentListItem>
                  <DocumentListItem>
                    <p
                      style={{
                        display: 'flex'
                      }}
                    >
                      {' '}
                      <span style={{ marginLeft: '5px' }}>• </span>
                      <span>
                        {`الامتثال، عند الاقتضاء، لالتزاماتنا القانونية بما في ذلك تلبية المتطلبات الخاصة بالأنظمة السعودية،`}
                      </span>
                    </p>{' '}
                  </DocumentListItem>
                  <DocumentListItem>
                    <p
                      style={{
                        display: 'flex'
                      }}
                    >
                      {' '}
                      <span style={{ marginLeft: '5px' }}>• </span>
                      <span>
                        {`الكشف عن والتحقيق في ومنع الأنشطة التي قد تنتهك سياسات شورى أو أحكام وشروط الاستخدام أو التي تكون غير قانونية`}
                      </span>
                    </p>{' '}
                  </DocumentListItem>
                  <DocumentListItem>
                    <p
                      style={{
                        display: 'flex'
                      }}
                    >
                      {' '}
                      <span style={{ marginLeft: '5px' }}>• </span>
                      <span>
                        {`الشركات التابعة لشورى: قد نشارك معلوماتك مع الشركات التابعة لشورى للمساعدة في تقديم الخدمات والحفاظ عليها وتحسينها. ومع نمونا، قد نقوم بتوسيع مجموعة الشركات التابعة لنا عن طريق إنشاء شركات فرعية محلية أو شركات أخرى تابعة، عند الاقتضاء، لمساعدتنا في تقديم الخدمات أو تسويقها.`}
                      </span>
                    </p>{' '}
                  </DocumentListItem>
                  <DocumentListItem>
                    <p
                      style={{
                        display: 'flex'
                      }}
                    >
                      {' '}
                      <span style={{ marginLeft: '5px' }}>• </span>
                      <span>
                        {`إعادة تنظيم الأعمال: يجوز لنا أيضًا مشاركة معلوماتك كجزء من عملية بيع أو دمج أو تغير في السيطرة أو استعدادًا لأي من هذه الأحداث.`}
                      </span>
                    </p>{' '}
                  </DocumentListItem>
                </DocumentList>
              </DocumentBlock>

              <DocumentBlock>
                <DocumentTitle>الإعلانات والتحليلات</DocumentTitle>
                <DocumentList>
                  <DocumentListItem>{`قد نسمح للآخرين بتقديم خدمات التحليلات وتقديم الإعلانات عبر خدماتنا ونيابةً عنا عبر الموقع الإلكتروني ومن خلال تطبيقات الجوال. وقد تستخدم هذه الكيانات ملفات تعريف الارتباط وإشارات الويب ومُعرّفات الأجهزة والتقنيات الأخرى لجمع معلومات حول استخدامك لخدماتنا ومواقع الويب والتطبيقات الأخرى، بما في ذلك عنوان بروتوكول الإنترنت الخاص بك ومتصفح الويب ومعلومات شبكة الجوال والصفحات التي تم عرضها والوقت الذي تقضيه عبر الصفحات أو في تطبيقات الجوال والروابط التي تم النقر عليها ومعلومات التحويل. وقد تستخدم شورى هذه المعلومات لكي تقوم، من بين أمور أخرى، بتحليل البيانات وتتبعها وتحديد نسبة انتشار محتوى معين وتقديم إعلانات ومحتوى يستهدف اهتماماتك عبر خدماتنا والمواقع الإلكترونية الأخرى وقياس فعالية إعلاناتنا وفهم نشاطك عبر الإنترنت بشكل أفضل. `}</DocumentListItem>
                  <DocumentListItem>{`نعمل مع أطراف ثالثة لتقديم الإعلانات إليك كجزء من الحملات المخصصة على منصات الأطراف الثالثة (مثل فيسبوك وإنستجرام). نقوم، كجزء من هذه الحملات الإعلانية، نحن أو منصات الأطراف الثالثة بتحويل معلومات بشأنك، مثل عنوان بريدك الإلكتروني ورقم هاتفك، إلى قيمة فريدة يمكن مطابقتها مع حساب مستخدم عبر هذه المنصات للسماح لنا بمعرفة اهتماماتك وتقديم إعلانات مخصصة لك حسب اهتماماتك. ولاحظ أن منصات الأطراف الثالثة قد تقدم لك خيارات بشأن ما إذا كنت تود رؤية هذه الأنواع من الإعلانات المخصصة أم لا.`}</DocumentListItem>
                  <DocumentListItem>{`لا نبيع معلوماتك الشخصية أو نشاركها مع أطراف ثالثة لأغراض التسويق المباشر، إلا بعد الحصول على موافقتك.`}</DocumentListItem>
                </DocumentList>
              </DocumentBlock>

              <DocumentBlock>
                <DocumentTitle>أساسنا القانوني لاستخدام معلوماتك</DocumentTitle>
                <DocumentList>
                  <DocumentListItem>{`يُطلب منا، داخل المملكة العربية السعودية، تحديد الأغراض التي من أجلها نعالج معلوماتك الشخصية والأسس القانونية التي نستند إليها في ذلك. تستند شورى إلى عددٍ من الأسس القانونية لجمع معلوماتك واستخدامها ومشاركتها ومعالجتها للأغراض الموضحة في إشعار الخصوصية هذا، بما في ذلك عندما:`}</DocumentListItem>
                  <DocumentListItem>
                    <p
                      style={{
                        display: 'flex'
                      }}
                    >
                      {' '}
                      <span style={{ marginLeft: '5px' }}>• </span>
                      <span>
                        {`يكون من الضروري تقديم الخدمات والوفاء بالتزاماتنا وفقًا لشروط المستخدم. لا يمكننا، على سبيل المثال، تقديم الخدمة ما لم نقم بجمع المعلومات الأساسية عنك ومعالجتها`}{' '}
                      </span>
                    </p>{' '}
                  </DocumentListItem>
                  <DocumentListItem>
                    <p
                      style={{
                        display: 'flex'
                      }}
                    >
                      {' '}
                      <span style={{ marginLeft: '5px' }}>• </span>
                      <span>
                        {`تكون قد قدمت موافقتك لنا على معالجة معلوماتك (يمكنك، في هذه الحالة، إلغاء موافقتك في أي وقت)`}{' '}
                      </span>
                    </p>{' '}
                  </DocumentListItem>
                  <DocumentListItem>
                    <p
                      style={{
                        display: 'flex'
                      }}
                    >
                      {' '}
                      <span style={{ marginLeft: '5px' }}>• </span>
                      <span>
                        {`يقتضي الأمر الامتثال لالتزام قانوني، بما يشمل، على سبيل المثال: الرد على طلبات صادرة عن جهة حكومية أو جهة إنفاذ القانون بشأن تقديم معلومات، أو لغرض رفع دعاوى قانونية أو ممارستها أو الدفاع فيها`}{' '}
                      </span>
                    </p>{' '}
                  </DocumentListItem>
                  <DocumentListItem>
                    <p
                      style={{
                        display: 'flex'
                      }}
                    >
                      {' '}
                      <span style={{ marginLeft: '5px' }}>• </span>
                      <span>
                        {`لحماية المصالح المهمة للمستخدمين والموظفين لدينا الموجودين ضمن الخدمات وخارجها`}
                      </span>
                    </p>{' '}
                  </DocumentListItem>
                  <DocumentListItem>
                    <p
                      style={{
                        display: 'flex'
                      }}
                    >
                      {' '}
                      <span style={{ marginLeft: '5px' }}>• </span>
                      <span>
                        {`يجوز لنا معالجة البيانات بما يصب في المصلحة العامة، حسبما يسمح به القانون`}
                      </span>
                    </p>{' '}
                  </DocumentListItem>
                  <DocumentListItem>
                    <p
                      style={{
                        display: 'flex'
                      }}
                    >
                      {' '}
                      <span style={{ marginLeft: '5px' }}>• </span>
                      <span>
                        {`و/أو يتعين القيام بالمعالجة لأغراض المصالح المشروعة  لشورى أو أطراف ثالثة، شريطة تحقيق الموازنة بين هذه الأغراض وحقوقك ومصالحك الأساسية.`}
                      </span>
                    </p>{' '}
                  </DocumentListItem>
                  <DocumentListItem>
                    {`نحتفظ بمعلوماتك طالما كان ذلك ضروريًا على نحوٍ معقول لتقديم الخدمات إليك أو حتى يتم حذف حسابك، أيهما أطول، رهنًا بأية فترة أطول منهما حسبما يقتضي القانون المعمول به أو حسبما يتم إخطارك. وفيما يلي أمثلة على بعض فترات الاحتفاظ بالسجلات لدينا.`}
                  </DocumentListItem>
                  <DocumentListItem>
                    <TableContainer
                      component={'div'}
                      style={{
                        border: '1px solid #eee',
                        borderRadius: '10px',
                        overflow: 'hidden'
                      }}
                    >
                      <Table sx={{ minWidth: '100%' }} aria-label="simple table">
                        <TableHead>
                          <TableRow>
                            <TableCell
                              style={{
                                borderLeft: '1px solid #eee',
                                borderRadius: 0,
                                boxShadow: 'none'
                              }}
                            >
                              نوع البيانات
                            </TableCell>
                            <TableCell
                              style={{
                                borderRadius: 0,
                                boxShadow: 'none'
                              }}
                            >
                              فترة الاحتفاظ
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          <TableRow>
                            <TableCell
                              style={{
                                borderLeft: '1px solid #eee'
                              }}
                            >
                              معلومات الحساب
                            </TableCell>
                            <TableCell>
                              مدة بقاء الحساب. يتم الاحتفاظ ببعض المعلومات المتعلقة بالمعاملات
                              الخاصة بالحساب بما يتماشى مع التزامات شركة شورى.
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </DocumentListItem>
                  <DocumentListItem>
                    عند قيامك بحذف حسابك، قد يستغرق الأمر وقتًا إضافيًا لحذف بعض معلوماتك من قواعد
                    البيانات وسجلات الأنظمة لدينا. كما يجوز لنا أيضًا الاحتفاظ ببعض من المعلومات
                    الواردة من الحسابات المحذوفة لمنع الاحتيال أو تحصيل رسوم أو إنفاذ أحكام وشروط
                    الاستخدام أو الامتثال لالتزاماتنا القانونية أو إنفاذ حقوقنا القانونية.
                  </DocumentListItem>
                </DocumentList>
              </DocumentBlock>

              <DocumentBlock>
                <DocumentTitle>حقوقك</DocumentTitle>
                <DocumentList>
                  <DocumentListItem>{`قد تنطبق بعض من الحقوق التالية:`}</DocumentListItem>
                </DocumentList>
                <Box>
                  <DocumentList>
                    <DocumentListItem>
                      <p
                        style={{
                          display: 'flex'
                        }}
                      >
                        {' '}
                        <span style={{ marginLeft: '5px' }}>• </span>
                        <span>
                          الحق في الاعتراض{' '}
                          <span
                            style={{
                              fontWeight: 'bold'
                            }}
                          >
                            {` (التسويق) `}
                          </span>{' '}
                          يحق لك الاعتراض على المعالجة لأغراض التسويق المباشر في أي وقت.
                        </span>
                      </p>{' '}
                    </DocumentListItem>

                    <DocumentListItem>
                      <p
                        style={{
                          display: 'flex'
                        }}
                      >
                        {' '}
                        <span style={{ marginLeft: '5px' }}>• </span>
                        <span>
                          الحق في الاعتراض 
                          <span
                            style={{
                              fontWeight: 'bold'
                            }}
                          >{`(المصالح المشروعة)`}</span>{' '}
                          عندما نعالج معلوماتك بناءً على المصالح المشروعة، يمكنك الاعتراض على هذه
                          المعالجة في ظروف معينة. ما لم يكن لدينا أسباب مشروعة مقنعة أو إذا كان ذلك
                          مطلوبًا لأسباب قانونية، سنتوقف عن معالجة معلوماتك في حالة اعتراضك على هذه
                          المعالجة.
                        </span>
                      </p>{' '}
                    </DocumentListItem>

                    <DocumentListItem>
                      <p
                        style={{
                          display: 'flex'
                        }}
                      >
                        {' '}
                        <span style={{ marginLeft: '5px' }}>• </span>
                        <span>
                          حق الوصول - يمكنك الوصول إلى الكثير من معلوماتك عن طريق تسجيل الدخول إلى
                          حسابك. ويمكنك أيضًا طلب نسخة من المعلومات التي لدينا عنك والمعلومات التي
                          تشرح كيفية استخدام المعلومات.
                        </span>
                      </p>{' '}
                    </DocumentListItem>
                    <DocumentListItem>
                      <p
                        style={{
                          display: 'flex'
                        }}
                      >
                        {' '}
                        <span style={{ marginLeft: '5px' }}>• </span>
                        <span>حق التصحيح - يحق لك طلب تصحيح معلومات غير دقيقة عنك.</span>
                      </p>{' '}
                    </DocumentListItem>
                    <DocumentListItem>
                      <p
                        style={{
                          display: 'flex'
                        }}
                      >
                        {' '}
                        <span style={{ marginLeft: '5px' }}>• </span>
                        <span>
                          الحق في تقييد المعالجة - يحق لك، في حالات معينة، تقييد معالجة معلوماتك
                          بشكل مؤقت، شريطة أن تكون هناك أسباب سليمة للقيام بذلك.{' '}
                        </span>
                      </p>{' '}
                    </DocumentListItem>
                    <DocumentListItem>
                      <p
                        style={{
                          display: 'flex'
                        }}
                      >
                        {' '}
                        <span style={{ marginLeft: '5px' }}>• </span>
                        <span>
                          الحق في نقل البيانات - يحق لك الحصول على بعض معلوماتك في تنسيق منظم وشائع
                          الاستخدام ومقروء آليًا ونقل هذه المعلومات إلى مراقب بيانات آخر.{' '}
                        </span>
                      </p>{' '}
                    </DocumentListItem>
                    <DocumentListItem>
                      <p
                        style={{
                          display: 'flex'
                        }}
                      >
                        {' '}
                        <span style={{ marginLeft: '5px' }}>• </span>
                        <span>
                          الحق في تقييد المعالجة - يحق لك، في حالات معينة، تقييد معالجة معلوماتك
                          بشكل مؤقت، شريطة أن تكون هناك أسباب سليمة للقيام بذلك.{' '}
                        </span>
                      </p>{' '}
                    </DocumentListItem>
                    <DocumentListItem>
                      <p
                        style={{
                          display: 'flex'
                        }}
                      >
                        {' '}
                        <span style={{ marginLeft: '5px' }}>• </span>
                        <span>
                          الحق في سحب الموافقة - عندما تكون قد قدمت موافقتك في وقتٍ سابق، مثل إرسال
                          رسائل تسويق مباشر إليك، يحق لك سحب الموافقة في أي وقت. ومع ذلك، لن يؤثر
                          ذلك على قانونية المعالجة بناءً على الموافقة قبل سحبها. علاوة على ذلك، حتى
                          في حالة سحب الموافقة، قد نستمر في استخدام معلوماتك على النحو الذي يسمح به
                          أو يقتضيه القانون.{' '}
                        </span>
                      </p>{' '}
                    </DocumentListItem>
                    <DocumentListItem>
                      <p
                        style={{
                          display: 'flex'
                        }}
                      >
                        {' '}
                        <span style={{ marginLeft: '5px' }}>• </span>
                        <span>
                          الحق في تقديم توجيهات بشأن إدارة بياناتك بعد وفاتك - يحق لك تقديم توجيهات
                          محددة لنا بشأن تخزين بياناتك الشخصية وحذفها بعد وفاتك.
                        </span>
                      </p>{' '}
                    </DocumentListItem>
                    <DocumentListItem>
                      <p
                        style={{
                          display: 'flex'
                        }}
                      >
                        {' '}
                        <span style={{ marginLeft: '5px' }}>• </span>
                        <span>
                          يُرجى الاتصال بنا على النحو المبين في قسم الاتصال الوارد أدناه إذا كنت
                          ترغب في ممارسة أيٍ من هذه الحقوق أو إذا كان لديك أي مخاوف بشأن كيفية
                          معالجة معلوماتك. وقد نطلب منك، لأغراض أمنية، اتباع خطوات معينة للتحقق من
                          أنك مالك حساب لدى شورى على سبيل المثال، قد نطلب أن يكون لديك بريد إلكتروني
                          تم التحقق منه مرتبط بحسابك لدى شركة شورى وأن تتصل بنا باستخدام البريد
                          الإلكتروني المتحقق منه المرتبط بحسابك لدى شورى.
                        </span>
                      </p>{' '}
                    </DocumentListItem>
                    <DocumentListItem>
                      <p
                        style={{
                          display: 'flex'
                        }}
                      >
                        {' '}
                        <span style={{ marginLeft: '5px' }}>• </span>
                        <span>
                          اختياراتك وكيف يمكنك إدارة معلوماتك: نعتقد أنه ينبغي أن يكون لديك اختيارات
                          حول جمع معلوماتك واستخدامها ومشاركتها. إذا كنت لا تريد أن تقوم شركة شورى
                          بجمع معلوماتك، يُرجى عدم استخدام الخدمات.
                        </span>
                      </p>{' '}
                    </DocumentListItem>
                    <DocumentListItem>
                      <p
                        style={{
                          display: 'flex'
                        }}
                      >
                        {' '}
                        <span style={{ marginLeft: '5px' }}>• </span>
                        <span>
                          رسائل البريد الإلكتروني والاتصالات الأخرى: إذا كنت ترغب في تغيير أنواع
                          الاتصالات التي تتلقاها منا، بما في ذلك إلغاء الاتصالات الترويجية منا،
                          يمكنك القيام بذلك في أي وقت عن طريق تحديث تفضيلات الاتصال المحددة في الملف
                          التعريفي لحسابك. قد نواصل إرسال اتصالات غير ترويجية ومعلومات أخرى حول
                          استخدامك للخدمة.
                        </span>
                      </p>{' '}
                    </DocumentListItem>
                    <DocumentListItem>
                      <p
                        style={{
                          display: 'flex'
                        }}
                      >
                        {' '}
                        <span style={{ marginLeft: '5px' }}>• </span>
                        <span>
                          الوصول إلى معلوماتك وإدارتها: إذا كنت تمتلك حسابًا لدى المنصة، يمكنك
                          مراجعة معلوماتك أو تغييرها أو حذفها من خلال تسجيل الدخول إلى حسابك وتعديل
                          ملفك التعريفي. يمكنك تغيير رقم جوالك أو عنوان بريدك الإلكتروني باستخدام
                          ميزة التغيير داخل التطبيق. يمكنك حذف حسابك لدى المنصة في أي وقت عن طريق
                          إرسال طلب إلينا عبر {' '}
                          <a
                            style={{
                              color: '#d49e24',
                              fontWeight: 'bold'
                            }}
                            href="mailto:info@shwra.sa"
                          >
                            info@shwra.sa
                          </a>{' '}
                        </span>
                      </p>{' '}
                    </DocumentListItem>
                  </DocumentList>
                </Box>
              </DocumentBlock>

              <DocumentBlock>
                <DocumentTitle>التواصل</DocumentTitle>
                <DocumentList>
                  <DocumentListItem>{`يتم التواصل مع الموقع الالكتروني عبر:`}</DocumentListItem>
                </DocumentList>
                <Box>
                  <DocumentList>
                    <DocumentListItem>
                      <p
                        style={{
                          display: 'flex'
                        }}
                      >
                        {' '}
                        <span style={{ marginLeft: '5px' }}>• </span>
                        <span>
                          البريد الالكتروني الخاص بالموقع{' '}
                          <a
                            style={{
                              color: '#d49e24',
                              fontWeight: 'bold'
                            }}
                            href="mailto:info@shwra.sa"
                          >
                            {' '}
                            info@shwra.sa
                          </a>{' '}
                        </span>
                      </p>{' '}
                    </DocumentListItem>
                    <DocumentListItem>
                      <p
                        style={{
                          display: 'flex'
                        }}
                      >
                        {' '}
                        <span style={{ marginLeft: '5px' }}>• </span>
                        <span>
                          الرقم الموحد
                          <a
                            style={{
                              color: '#d49e24',
                              fontWeight: 'bold'
                            }}
                            href="tel:920033635"
                          >
                            {' (920033635) '}
                          </a>{' '}
                        </span>
                      </p>{' '}
                    </DocumentListItem>
                    <DocumentListItem>
                      <p
                        style={{
                          display: 'flex'
                        }}
                      >
                        {' '}
                        <span style={{ marginLeft: '5px' }}>• </span>
                        <span>{`تعبئة الاستمارة في (التواصل معنا).`}</span>
                      </p>{' '}
                    </DocumentListItem>
                    <DocumentListItem>
                      <p
                        style={{
                          display: 'flex'
                        }}
                      >
                        {' '}
                        <span style={{ marginLeft: '5px' }}>• </span>
                        <span>
                          عبر مواقع التواصل الاجتماعي الخاصة بالموقع الالكتروني تويتر- انستجرام :
                          shwraapp
                        </span>
                      </p>{' '}
                    </DocumentListItem>
                    <DocumentListItem>
                      <p
                        style={{
                          display: 'flex'
                        }}
                      >
                        {' '}
                        <span style={{ marginLeft: '5px' }}>• </span>
                        <span>
                          جميع الأسئلة والتعليقات أو الاستفسارات الخاصة بسياسة الخصوصية يمكن توجيهها
                          الى{' '}
                          <a
                            style={{
                              color: '#d49e24',
                              fontWeight: 'bold'
                            }}
                            href="mailto:info@shwra.sa"
                          >
                            {' (info@shwra.sa) '}
                          </a>{' '}
                          يرجى العلم أن جميع الرسائل الإلكترونية يتم حفظها كمرجع مستقبلي.
                        </span>
                      </p>{' '}
                    </DocumentListItem>
                  </DocumentList>
                </Box>
              </DocumentBlock>
            </Document>
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          {/* <Button onClick={handleClose}>اوفق</Button> */}
          <Button onClick={handleClose}>اغلاق</Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}
