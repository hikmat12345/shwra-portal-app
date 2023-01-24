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
    Link
} from '@mui/material';
// hooks
import useDialog from '../../../../hooks/useDialog';
// components
import { 
  Document,
  DocumentTitle,
  DocumentBlock,
  DocumentList,
  DocumentListItem,
  DocumentText
} from '../../../content';
// ----------------------------------------------------------------------

export default function TermsService() {

  const { open, openDialog, closeDialog } = useDialog();
  
  const handleClose = () => {
    closeDialog();
  }

  const handleOpen = () => {
    openDialog();
  }

  return (
   <Fragment>   

     <Link
      underline="always" 
      color="text.primary"
      onClick={handleOpen}
     > 
      شروط الخدمة 
     </Link>
       
     <Dialog 
       open={open}
       onClose={handleClose}
       scroll="paper"
       aria-labelledby="scroll-dialog-title"
       aria-describedby="scroll-dialog-description"
     >

        <DialogTitle id="scroll-dialog-title"> 
         اتفاقية الشروط والأحكام الخاصة بمنصة شورى
        </DialogTitle>

        <DialogContent  dividers={true} >
            <DialogContentText>
              <Document>

                <DocumentBlock>
                  <DocumentList>
                    <DocumentListItem>
                        {'يجب الاطلاع على هذه الشروط والأحكام بعناية قبل استخدام الموقع أو التطبيق الهاتفي أو إجراء أي تعامل، هذه الشروط والأحكام ملزمة قانوناً من خلال الموافقة الإلكترونية أو استخدام الموقع الإلكتروني أو التطبيق الهاتفي.'}
                    </DocumentListItem>

                    <DocumentListItem>
                        {'شورى منصة أنشئت من أجل الوساطة في تقديم الخدمات القانونية. باستخدامك لمنصة شورى فإنك توافق على هذه الاتفاقية من غير قيود أو شروط، ويحق لمنصة شورى في أي وقت تعديل هذه الاتفاقية وسيتم نشر النسخة المعدلة على المنصة، وتكون النسخة المعدلة من (اتفاقية الشروط والأحكام) سارية المفعول بعد أسبوع من تاريخ نشرها في المنصة، وبعد النشر يعتبر استمرارك في استخدام المنصة، التزاماً منك بالشروط والبنود الواردة في النسخة المعدلة، ورضاً منك في تطبيق التعديلات.'}
                    </DocumentListItem>

                    <DocumentListItem>
                        {'يقتصر دور المنصة على تقديم خدمات الوساطة بأجر بين مقدمي الخدمات والمستفيدين، وذلك عن طريق عرض الخدمات التي من خلال مقدمي الخدمة للمستفيدين، ولا تعتبر المنصة مسؤولة عن مستوى وجودة الخدمات المقدمة من مقدمي الخدمة.'}
                    </DocumentListItem>
                  </DocumentList>
                </DocumentBlock>

                <DocumentBlock>
                  <DocumentTitle>
                     أولاً: التعريفات: 
                  </DocumentTitle>
                  <DocumentText>
                      {'يقصد بالمصطلحات التالية متى ما وردت في هذه الاتفاقية – اتفاقية الشروط والأحكام - ما يلي (ما لم يقتضي السياق خلاف ذلك):'}
                  </DocumentText>
                  <DocumentList>
                    <DocumentListItem>
                      1-  {'" شركة شورا لتقنية المعلومات" هي منصة رقمية تعنى بتقديم الاستشارات والخدمات القانونية عن بعد في المملكة العربية السعودية من خلال ربط المستفيدين طالبي الاستشارات القانونية، مع نخبة من المحامين المرخصين والمحترفين بطريقة تفاعلية، سهلة وآمنة ومهنية واستناداً إلى القوانين مع الحفاظ على سرية وخصوصية بيانات المستفيدين، وتتضمن الاستشارات القانونية عدة مجالات منها: (الأحوال الشخصية، والعمالية، والتجارية لكل من الافراد والمؤسسات والشركات مختلف أنواعها ومستوياتها، وهي المالكة للموقع الإلكتروني والتطبيق الهاتفي، ومركزها الرئيسي في مدينة الرياض، المملكة العربية السعودية، مسجلة بسجل تجاري رقم 4650222665.'}
                    </DocumentListItem>
                    <DocumentListItem>
                      2-  {'"المستفيد" أي شخص طبيعي أو معنوي الذي يرغب في التعاقد مع المنصة أو استخدام الموقع الإلكتروني أو التطبيق الهاتفي أو التصفح.'}
                    </DocumentListItem>
                    <DocumentListItem>
                      3-  {' "موفر الخدمة": هو الشخص الطبيعي أو المعنوي الذي يقوم بعرض خدماته القانونية على المستفيدين من خلال المنصة في المجال الخاص به وفقاً لبياناته المسجلة في المنصة.'}
                    </DocumentListItem>
                    <DocumentListItem>
                      4-  {' المنصة: يقصد بها "تطبيق شورى" ما لم يكن لسياق النص معنى آخر، أي إشارة إليها فيما بعد فهي تعني التطبيق الهاتفي أو الموقع الإلكتروني أو كلاهما.'}
                    </DocumentListItem>
                    <DocumentListItem>
                      5-  {'" الحساب" تعني الصفحة أو السجل الخاص بالمستفيد، على المنصة من أجل التمكين من الاستفادة من خدمات منصة شورى.'}
                    </DocumentListItem>
                    <DocumentListItem>
                      6-  {'"الخدمة" تعني الخدمة أو الخدمات القانونية المتاحة من خلال المنصة.'}
                    </DocumentListItem>

                  </DocumentList>
                </DocumentBlock>

                <DocumentBlock>
                  <DocumentTitle>
                     ثانياً: شروط وأحكام الاستفادة من خدمات منصة شورى:
                  </DocumentTitle>

                  <DocumentList>
                    <DocumentListItem>
                      1-  {'ألا يقل عمر المستفيد عن 18 عام، وامتلاك الصلاحية القانونية للموافقة على هذه الشروط والأحكام.'}
                    </DocumentListItem>
                    <DocumentListItem>
                      2-  {'توافر الصفة القانونية في حال ما إذا كان المستفيد ولياً طبيعياً أو ممثلاً قانونياً عن الغير.'}
                    </DocumentListItem>
                    <DocumentListItem>
                      3-  {'الالتزام بهذه الشروط والأحكام، بالإضافة إلى الأنظمة المطبقة في المملكة العربية السعودية.'}
                    </DocumentListItem>
                    <DocumentListItem>
                      4-  {'الالتزام بتقديم البيانات والمعلومات الصحيحة عند التسجيل أو طلب الخدمة من خلال الموقع الإلكتروني أو التطبيق الهاتفي، ويحظر تقديم البيانات الكاذبة أو المضللة سواء ترتب عليها ضرر بالنسبة للغير أم لا.'}
                    </DocumentListItem>
                    <DocumentListItem>
                      5-  {'الالتزام بالمحافظة على جميع حقوق الملكية الفكرية الخاصة بشورى.'}
                    </DocumentListItem>
                    <DocumentListItem>
                      6-  {'يحظر على المستخدم نشر أو تحميل أي مواد تشهيرية، هجومية، انتهاكيه، مضرة، تهديدية، مسيئة، عنصرية، أو غير ملائمة أخلاقياً أو غير ذلك من محتوى أو معلومات غير قانونية.'}
                    </DocumentListItem>
                    <DocumentListItem>
                      7-  {'يحظر على المستخدم الدخول أو القيام بمحاولة دخول غير مصرح به لمنصة شورى أو منح الآخرين صلاحية استخدام حسابه، أو انتحال أي شخصية أو تحريف العضوية مع شخص آخر، ويتحمل المستخدم ما يترتب على مخالفته لأحكام هذه الفقرة.'}
                    </DocumentListItem>
                    <DocumentListItem>
                      8-  {'يحظر على المستخدم تحميل، أو إرفاق أي ملفات، أو برامج، أو أي مواد أخرى محمية من قبل قوانين حقوق الملكية الفكرية أو أي حقوق خاصة أو عامة لا يملك حقوق استخدامها.'}
                    </DocumentListItem>
                    <DocumentListItem>
                      9-  {'إذا تبين لمنصة شورى وفقاً لتقديرها الشخصي المنفرد قيام المستخدم بخرق أو مخالفة أي من هذه الشروط، فلها حق حذف أي طلبات أو محتوى تم نشره -بدون القيام بإنذار المستخدم، واتخاذ تدابير -من ضمنها إيقاف، تعليق أو تقييد وصول المستخدم للمنصة ومنع المستخدم من استخدام المنصة، والتبليغ عن المستخدم لدى مزودي خدمة الإنترنت أو السلطات المختصة، أو اتخاذ أي إجراءات قانونية.'}
                    </DocumentListItem>
                    <DocumentListItem>
                      10-  {'الخدمات المتاحة على منصة شورى يقدمها مقدمي خدمة مستقلين عن منصة شورى من حملة الشهادات المتخصصة في القانون، أو الشريعة.'}
                    </DocumentListItem>
                    <DocumentListItem>
                      11-  {'يلتزم المستخدم بسعر تقديم الخدمة ومدة تنفيذها ويلتزم بالتواصل مع المنصة وفقا للوقت المحدد لذلك وفي حال عدم قبول الاتصال يحق للمنصة عدم تقديم الخدمة مع تحصيل كامل المبلغ.'}
                    </DocumentListItem>
                    <DocumentListItem>
                      12-  {'منصة شورى لا تطلب من المستخدم أي معلومات أو مستندات سرية أو خاصة، سوى الطلبات المذكورة في المنصة أو التي تطلب فيما بعد عن طريق المنصة، وجميع الطلبات المتعلقة بتقديم الخدمة هي من مسؤوليات موفر الخدمة، ويقع على عاتقه وحده حمايتها وعدم إفشائها.'}
                    </DocumentListItem>
                    <DocumentListItem>
                      13-  {'يحظر على المستخدم القيام بأي عمل قد يؤدي إلى حدوث ضغط غير محتمل أو غير متناسب مع المنصة أو البنية التحتية الخاصة بها، على سبيل المثال:'}
                     
                      <DocumentList>
                        <DocumentListItem>
                          1- {'تسجيل المستخدم من أكثر من بريد الكتروني، او رقم جوال والدخول على المنصة من خلالها.'}
                        </DocumentListItem>
                        <DocumentListItem>
                          2- {'التواطؤ مع أكثر من شخص للدخول للمنصة في نفس الوقت لتشكيل ضغط عليها. محاولة اختراق المنصة أو التأثير على الخدمات المقدمة.'}
                        </DocumentListItem>
                      </DocumentList>
                    </DocumentListItem>

                  </DocumentList>
                </DocumentBlock>


                <DocumentBlock>
                  <DocumentTitle>
                    ثالثًا: نطاق وطبيعة الخدمات المقدمة من شورى:
                  </DocumentTitle>
                  <DocumentText>
                     {'تقديم الخدمات والدعم القانوني للمعاملات ذات العلاقة بالأنظمة التجارية والعقارية والشركات والتمويل والقضايا العمالية والتأمين فضلاً عن إدارة القضايا وتمثيل العملاء في جميع أنواع المحاكم والهيئات واللجان شبه قضائية المختصة، وتحصل المبالغ المالية، التحكيم التجاري في المنازعات باللغتين العربية والانجليزية، كما تتضمن الخدمات: القضايا بجميع أنواعها، العقود، المطالبات المالية والمذكرات، والاستشارات.'}
                  </DocumentText>
                </DocumentBlock>



                <DocumentBlock>
                  <DocumentTitle>
                     رابعاً: التسجيل والحجز:
                  </DocumentTitle>
                  <DocumentText>
                      {'عند قيام المستفيد بالتسجيل في الموقع الإلكتروني أو التطبيق الهاتفي (حيث أنه من أجل الاستفادة من بعض الخدمات، يلزم إنشاء حساب والتسجيل، ويحظر استخدام حساب شخص آخر) فإن المستفيد يقر عن نفسه وبالنيابة عمن يمثلهم (حال وجودهم) بالموافقة على الآتي (طلب التسجيل يعني موافقتك وإقرارك بما يلي):'}
                  </DocumentText>
                  <DocumentList>
                    <DocumentListItem>
                     1- {'كافة الشروط والأحكام الخاصة بحجز أو طلب الخدمة.'}
                    </DocumentListItem>
                    <DocumentListItem>
                     2- {'جميع الرسوم المفروضة بما فيها الضرائب والرسوم بكافة أنواعها.'}
                    </DocumentListItem>
                    <DocumentListItem>
                     3- {'قبول المسؤولية المالية لسداد قيمة الخدمة.'}
                    </DocumentListItem>
                    <DocumentListItem>
                     4- {'الالتزام بالشروط والأحكام الملزمة أو أي من تعديلاتها اللاحقة.'}
                    </DocumentListItem>
                    <DocumentListItem>
                     5- {'استخدام معلوماتك بما يتوافق مع سياسة الخصوصية. '}
                    </DocumentListItem>
                    <DocumentListItem>
                     6- {'التحقق من كافة البيانات الخاصة بك، كما أنك تقر بملكيتك للبريد الإلكتروني المدخل ورقم الجوال.'}
                    </DocumentListItem>
                    <DocumentListItem>
                     7- {'سياسة الإلغاء والتعديل الخاصة بشورى.'}
                    </DocumentListItem>
                    <DocumentListItem>
                     8- {'فور تأكيد الحجز أو طلب الخدمة ينعقد الالتزام بين المستفيد وشورى.'}
                    </DocumentListItem>
                    <DocumentListItem>
                     9- {'تحتفظ شورى بحقها في رفض أي حجز أو طلب خدمة أو أي تأكيد لأي منهما وفق إرادتها المنفردة دون أدنى مسؤولية عليها.'}
                    </DocumentListItem>
                    <DocumentListItem>
                     10- {'تحتفظ شورى بحقها الكامل لتصحيح أي خطأ قد يقع في الأسعار المعلنة أو في الخدمات وسوف تقوم شورى بالتصحيح فور العلم بذلك، على أن يتم ذلك قبل البدء في تنفيذ الخدمة، وللمستفيد الخيار بين الاستمرار في التنفيذ بعد التصحيح أو فسخ العقد واسترداد ما تم دفعه.'}
                    </DocumentListItem>
                    <DocumentListItem>
                     11- {'تختلف الأسعار بناء على عملة السداد التي تم اختيارها للسداد (حال تم السداد من خارج المملكة العربية السعودية).'}
                    </DocumentListItem>
                    <DocumentListItem>
                     12- {'لن تتحمل شورى المسئولية عن أي تأخير أو عدم تنفيذ الحجز أو الخدمة الخاصة بك حال تقديم معلومات غير صحيحة.'}
                    </DocumentListItem>
                    <DocumentListItem>
                     13- {'يجب عليك التأكد من كافة البيانات المدخلة قبل تأكيد الحجز.'}
                    </DocumentListItem>
                    <DocumentListItem>
                     14- {'يعتبر الحجز مُفعل من تاريخ استلام المستفيد لرسالة التأكيد عبر البريد الإلكتروني او الجوال.'}
                    </DocumentListItem>
                  </DocumentList>
                </DocumentBlock>



                <DocumentBlock>
                  <DocumentTitle>
                    خامساً: التعديل والإلغاء:
                  </DocumentTitle>
                  <DocumentList>
                    <DocumentListItem>
                     1- {'متى كان من الممكن إجراء أي تعديل على الحجز أو طلب الخدمة وذلك بناء على طلبك، فسوف تتحمل وحدك أية مصروفات إضافية في هذا الشأن.'}
                    </DocumentListItem>
                    <DocumentListItem>
                     2- {'لشورى الحق في إجراء أي تعديل على الحجز أو طلب الخدمة بناء على إرادتها المنفردة متى دعت الحاجة إلى ذلك مع التأكيد على إخطاركم بهذا التعديل.'}
                    </DocumentListItem>
                    <DocumentListItem>
                     3- {'لشورى الحق في تعديل رسوم الخدمات في أي وقت دون إشعار مسبق، مع مراعاة عدم تطبيق التعديل على الطلبات القائمة (قيد التنفيذ)، فبمجرد إكمال المستفيد للطلب، فإن الرسوم المحددة بالطلب لن تتغير مع تغير الرسوم على الموقع الإلكتروني أو التطبيق الهاتفي.'}
                    </DocumentListItem>
                    <DocumentListItem>
                     4- {'في حال تقديم طلب تأجيل موعد الحجز أو تقديم الخدمة (في الحالات التي يسمح فيها بذلك) بناء على طلب من المستفيد، فيجب أن يتم إبداء هذا الطلب قبل (3) ساعات من التاريخ المقرر لتقديم الخدمة.'}
                    </DocumentListItem>
                    <DocumentListItem>
                     5- {'بعض طلبات التعديل لا يمكن الوفاء بها دائماً.'}
                    </DocumentListItem>
                    <DocumentListItem>
                     6- {'لشورى الحق في إلغاء الحجز الخاص بك في حال مخالفتك لأحد الشروط الجوهرية لهذه الشروط والأحكام، على أن يتم إشعارك بالبريد الإلكتروني او رقم الجوال '}
                    </DocumentListItem>
                    <DocumentListItem>
                     7- {'المسجل بهذا الإلغاء، وذلك دون أدنى مسئولية على شورى.'}
                    </DocumentListItem>
                    <DocumentListItem>
                     8- {'في حال الإلغاء من قبل شورى دون سبب مشروع، أو لظرف قهري خارج عن إرادة شورى أو المستفيد أو موفر الخدمة، فتلتزم شورى وموفر الخدمة برد الرسوم المدفوعة خلال (3) يوم من تاريخ الإلغاء.'}
                    </DocumentListItem>   
                    <DocumentListItem>
                     9- {'في حال إلغاء الحجز أو طلب الخدمة من قبل المستفيد (في الحالات التي يسمح فيها بالإلغاء)، فسوف يتم حسم مبلغ وقدره 0 ريال من إجمالي مستحقات المستفيد لدى شورى كرسوم إلغاء.'}
                    </DocumentListItem>
                    <DocumentListItem>
                     10- {'في حالة إلغاء الحجز من قبل المستفيد بعد البدء في تنفيذ الخدمة من قبل موفر الخدمة فلن يتم رد أي من الرسوم المدفوعة ولا يحق للمستفيد المطالبة بالرسوم السابق سدادها.'}
                    </DocumentListItem>
                    <DocumentListItem>
                     11- {'تتعهد شورى (في الحالات التي يسمح فيها بالإلغاء والاسترداد) برد المتبقي من المبالغ السابق استلامها خلال (3) أيام عمل من تاريخ الإخطار بالرغبة في إلغاء الحجز أو تقديم الخدمة.'}
                    </DocumentListItem>   
                    <DocumentListItem>
                     12- {'تتم جميع طلبات التعديل أو الإلغاء عن طريق طلب من خلال البريد الإلكتروني المسجل من قبل المستفيد عند التسجيل في شورى إلى البريد الإلكتروني التالي: info@shwra.sa.'}
                    </DocumentListItem>
                  </DocumentList>
                </DocumentBlock>



                <DocumentBlock>
                  <DocumentTitle>
                     سادساً: خدمات الدفع:
                  </DocumentTitle>
                  <DocumentList>
                    <DocumentListItem>
                     1- {'يلتزم المستفيد بسداد قيمة الخدمة أو الحجز من خلال وسائل الدفع المتاحة في المنصة قبل مباشرة موفر الخدمة للعمل محل الخدمة، ولن يتم تقديم الخدمة أو مباشرة العمل حتى يتم دفع كامل قيمة الحجز أو الخدمة.'}
                    </DocumentListItem>
                    <DocumentListItem>
                     2- {'يحظر على المستخدم الاحتيال في استخدام وسيلة دفع غير صحيحة أو غير صالحة أو غير مملوكة له، ويتحمل المستخدم المسؤولية نتيجة مخالفة هذه الفقرة، وسيتم الإبلاغ عنه ومحاسبته جزائياً وتطبيق العقوبات عليه.'}
                    </DocumentListItem>
                    <DocumentListItem>
                     3- {'جميع عمليات الدفع تتم بالريال السعودي، وفي حال قام المستخدم بالدفع باستخدام عملة أخرى فيتحمل النفقات والأجور المترتبة على تحويل العملة أو أي رسوم بنكية أخرى.'}
                    </DocumentListItem>
                  </DocumentList>
                </DocumentBlock>



                <DocumentBlock>
                  <DocumentTitle>
                    سابعاً: السلوك المحظور: 
                  </DocumentTitle>
                  <DocumentText>
                     {'بموجب هذا أنت توافق على الامتناع عن إتيان أي من الأفعال التالية: '}
                  </DocumentText>
                  <DocumentList>
                    <DocumentListItem>
                     1- {'التعهد بعدم استغلال أو نشر المعلومات أو البيانات التي يتم عرضها من خلال شورى إلى أي تطبيق هاتفي أو موقع إلكتروني آخر خارج شورى بأي طريقة كانت. '}
                    </DocumentListItem>
                    <DocumentListItem>
                     2- {'الإخلال أو التلاعب بالشبكات أو البرمجيات الخاصة بشورى.'}
                    </DocumentListItem>
                    <DocumentListItem>
                     3- {'التورط في أي عمل غير قانوني أو اتصالات ذات صلة أو التشجيع عليها.'}
                    </DocumentListItem>
                    <DocumentListItem>
                     4- {'تجنب استخدام الألفاظ الجارحة أو القذف أو التشهير بشورى أو أي من منسوبيه أو متابعيه أو المتعاونين معه بأي شكل من الأشكال، فضلاً عن أن شورى ليست محلاً للمناقشات الدينية أو العقائدية أو السياسية أو العرقية أو العنصرية أو العدوانية.'}
                    </DocumentListItem>
                    <DocumentListItem>
                     5- {'نقل ملفات، أو بيانات، أو أي مواد أخرى تحتوي على أحد فيروسات الكومبيوتر، أو بيانات معطوبة، أو فيروسات متنقلة، أو "أحصنة طروادة"، أو أي أوامر أو تصميمات قد تحذف البيانات أو البرمجة أو تؤدي إلى تعطيل (الموقع) أو تؤدي إلى إعاقة استخدام أي تجهيز أو نظام بالصورة الكاملة التي تم تصميمه من أجلها.'}
                    </DocumentListItem>
                  </DocumentList>
                </DocumentBlock>



                <DocumentBlock>
                  <DocumentTitle>
                    ثامناً: حدود المسؤولية:
                  </DocumentTitle>

                  <DocumentList>
                    <DocumentListItem>
                     1- {'شورى غير مسئولة عن أي خسارة مباشرة أو غير مباشرة تنشأ عن استخدام الموقع الإلكتروني أو التطبيق الهاتفي.'}
                    </DocumentListItem>
                    <DocumentListItem>
                     2- {'يقر المستفيد باستخدامه للموقع الإلكتروني أو التطبيق الهاتفي على مسؤوليته الخاصة ولا تتحمل شورى أي مسؤولية عن أي ضرر أو إصابة نتيجة لدخول أي مستخدم للموقع الإلكتروني أو التطبيق الهاتفي أو تعذر الدخول أو الاستخدام.'}
                    </DocumentListItem>
                    <DocumentListItem>
                     3- {'تتحمل وحدك المسؤولية عن التسجيل والحجز في شورى ومدى ملاءمة الخدمات المقدمة من شورى لاحتياجاتك، ولا يمكن مساءلة شورى في هذا الشأن.'}
                    </DocumentListItem>
                    <DocumentListItem>
                     4- {' أنت وحدك المسئول عن أي نشاط يتم من خلال حسابك دون أدنى مسئولية على شورى.'}
                    </DocumentListItem>
                    <DocumentListItem>
                     5- {'شورى لن تكون مسؤولة عن الخسائر الناجمة عن أي استخدام غير مصرح به لحسابك، فقد تكون مسؤولاً عن الخسائر الناجمة لشورى أو غيره نتيجة هذا الاستخدام غير المصرح به.'}
                    </DocumentListItem>
                    <DocumentListItem>
                     6- {'لشورى الحق دون أدنى مسئولية عليها في إلغاء أي حساب أو تسجيل بناء على تقديرها المطلق ودون إخطار أو إشعار. '}
                    </DocumentListItem>
                    <DocumentListItem>
                     7- {'تتحمل أيضًا المسؤولية عن المعلومات المقدمة وقت إنشاء الحساب و/أو حجز الخدمة، ولا يمكن تحميل شورى أية مسؤولية في هذا الشأن.'}
                    </DocumentListItem>
                    <DocumentListItem>
                     8- {'عند تعرض المستفيد لأي أضرار تنتج عن تقصير أو إهمال موفر الخدمة في تنفيذ الخدمة فإن موفر الخدمة وحده يتحمل المسؤولية الكاملة أمام المستفيد، ولا تلتزم منصة شورى بتحمل أي التزامات أو مسؤوليات تجاه المستفيد.'}
                    </DocumentListItem>
                    <DocumentListItem>
                     9- {'يتم تقديم الخدمة للمستفيد في ضوء ما قدمه من مستندات ووقائع وفي حال إخفاء المستفيد لأي منها، فلا تسأل شورى أو موفر الخدمة عن هذا الخطأ أو النتيجة المترتبة عليه. '}
                    </DocumentListItem>
                    <DocumentListItem>
                     10- {'يتم إبداء الخدمة للمستفيد من قبل موفر الخدمة في ضوء المستندات والوقائع التي قدمها المستفيد، وفي حال وجود أي خطأ أو تقصير من قبل موفر الخدمة فيسأل وحده عن هذا الخطأ أو التقصير أو الإهمال دون أدنى مسؤولية على شورى.'}
                    </DocumentListItem>
                    <DocumentListItem>
                     11- {'يحق لموفر الخدمة الطلب من المستفيد تزويده بعدد من البيانات أو المستندات من أجل إعداد وتقديم الخدمة، ويقع على المستفيد وحده مسؤولية تزويد موفر الخدمة بهذه المستندات ولا تتحمل شورى أي استخدام خاطئ لهذه البيانات أو المستندات من قبل موفر الخدمة، كما يلتزم موفر الخدمة بالمحافظة على سرية المستندات، وعدم الإفصاح عن المستندات المقدمة من المستفيد'}
                    </DocumentListItem>
                    <DocumentListItem>
                     12- {'من المعلوم لكل من موفر الخدمة والمستفيد أن شورى يقتصر دورها على الوساطة بين موفر الخدمة والمستفيد فقط، ولا يمكن مساءلتها على خلاف ذلك.'}
                    </DocumentListItem>
                    <DocumentListItem>
                     13- {'يتحمل المستفيد المسؤولية الكاملة وحده عند مخالفته لأي من هذه الشروط والأحكام، أو مخالفة أي من توجيهات منصة شورى، أو توجيهات موفر الخدمة.'}
                    </DocumentListItem>
                    <DocumentListItem>
                     14- {'يلتزم المستفيد عند قيامه بسداد تكاليف الخدمة بالسداد عن طريق الوسائل والحسابات الموضحة في المنصة والخاصة بشورى، ويحظر على المستخدم سداد تكاليف الخدمات من أي حسابات مجهولة أو غير مملوكة للمستفيد، ويتحمل التبعات القانونية عند قيامه بذلك، علماً بأنه في الحالات التي يسمح فيها برد أتعاب الخدمة يتم الرد على نفس الحساب الذي تم السداد منه.'}
                    </DocumentListItem>
                  </DocumentList>
                </DocumentBlock>



                <DocumentBlock>
                  <DocumentTitle>
                   تاسعاً: تعديل الشروط والأحكام:
                  </DocumentTitle>

                  <DocumentList>
                    <DocumentListItem>
                     1- {'تحتفظ شورى بحقها في تعديل هذه الشروط والأحكام من حين لآخر وفقاً لإرادتها المنفردة وفقاً لما تراه من أجل تحسين العمل والخدمة داخل شورى دون أدنى مسئولية عليها.'}
                    </DocumentListItem>
                    <DocumentListItem>
                     2- {'في حال اعتراضك على أي من بنود هذه الشروط والأحكام أو التي يتم تعديلها من قبل شورى ويتم إخطارك بها، ففي هذه الحالة لا سبيل أمامك سوى التوقف عن استخدام الموقع الإلكتروني أو التطبيق الهاتفي وإنهاء حساب العضوية الخاص بك.'}
                    </DocumentListItem>
                    <DocumentListItem>
                     3- {'سوف يتم إشعارك بالتعديلات أو التغييرات أو التحسينات التي تتم من خلال شورى عبر البريد الإلكتروني المسجل، كما أنها سوف تصبح سارية في حقك خلال (5) أيام من تاريخ إشعارك بها ومرور هذه المدة دون إلغاء الحساب واستخدامك للموقع الإلكتروني أو التطبيق الهاتفي يعتبر موافقة منك على التعديلات أو التحديثات.'}
                    </DocumentListItem>
                  </DocumentList>
                </DocumentBlock>


                <DocumentBlock>
                  <DocumentTitle>
                   عاشراً: حقوق الملكية الفكرية:
                  </DocumentTitle>

                  <DocumentList>
                    <DocumentListItem>
                     1- {'الموقع الإلكتروني والتطبيق الهاتفي يحتويان على علامات تجارية، وأسرار مهنية، وتقنيات، ومنتجات، وخطوات عمل، وحقوق أخرى مملوكة لشورى و/أو أطراف أخرى.'}
                    </DocumentListItem>
                    <DocumentListItem>
                     2- {'شورى لا تمنحك أي ترخيص أو حق من حقوق الملكية الفكرية أو أي حقوق أخرى، ولا يحق لك إعادة إنتاج، أو توزيع، أو نشر، أو عرض، أو تحميل، أو نقل أي (مواد) إلا وفقًا للمسموح به صراحةً وفي حدود هذه الشروط والأحكام.'}
                    </DocumentListItem>
                  </DocumentList>
                </DocumentBlock>


                <DocumentBlock>
                  <DocumentTitle>
                   حادي عشر: سياسة الشكاوى:
                  </DocumentTitle>
                  <DocumentText>
                     {'تسعى شورى دائماً إلى تحسين وتطوير الخدمات المقدمة من خلالها، وتسهيلاً على المستفيدين تم إدراج هذه السياسة من أجل تقديم الخدمات على أكمل وجه بالإضافة إلى توفير قناة تواصل فعالة مع المستفيدين وذلك من خلال التالي:'}
                  </DocumentText>
                  <DocumentList>
                    <DocumentListItem>
                     1- {'التقدم بالشكوى خلال (3) يوم من حدوثها وإلا سقط الحق في تقديم الشكوى.'}
                    </DocumentListItem>
                    <DocumentListItem>
                     2- {'التحقيق في الشكوى سيتم بكل شفافية ونزاهة.'}
                    </DocumentListItem>
                    <DocumentListItem>
                     3- {'سيتم البت في الشكوى خلال (3) يوم عمل من تاريخ تقديمها كحد أقصى، وفي حال تطلبت الشكوى مزيداً من الدراسة سيتم إخطاركم بذلك.'}
                    </DocumentListItem>
                    <DocumentListItem>
                     4- {'في حال كانت الشكوى ضد موظف فلن يتم إحالة الشكوى على الموظف المشكو في حقه للتحقيق أو الفصل فيها بل سيتم عرضها على مديره المباشر مع إمكانية سماع رأيه (على سبيل الاسترشاد) بناء على تقدير مديره المباشر.'}
                    </DocumentListItem>
                    <DocumentListItem>
                     5- {'يمكنكم متابعة الشكوى من خلال وسائل التواصل المعلن عنها.'}
                    </DocumentListItem>
                    <DocumentListItem>
                     6- {'تم إدراج (info@shwra.sa) خاص بالشكاوى تسهيلاً على المستفيدين.'}
                    </DocumentListItem>
                  </DocumentList>
                </DocumentBlock>


                <DocumentBlock>
                  <DocumentTitle>
                   ثاني عشر: التعويض عن الأضرار: 
                  </DocumentTitle>
                  <DocumentText>
                     {'إنك توافق على تعويض شورى وأي التابعين لها أو شركائها أو موظفيها أو مديريها أو وكلائها أو مانحي التراخيص لها أو مزودي الخدمة أو متعهديها أو مورديها عن أي دعاوى قضائية بما فيها أتعاب المحامين والتكاليف القضائية، أو أية مطالبات من قبل أطراف أخرى بموجب خرقك هذه الشروط والأحكام أو الوثائق التي أدمجت كمراجع، أو بسبب أي انتهاك للقوانين أو حقوق أطراف أخرى.'}
                  </DocumentText>
                </DocumentBlock>

                <DocumentBlock>
                  <DocumentTitle>
                   ثالث عشر: الإشعارات:
                  </DocumentTitle>
                  <DocumentText>
                     {'لشورى الحق في إرسال جميع الإشعارات أو التعديلات أو المراسلات الأخرى التي تشترطها هذه الشروط والأحكام أو تسمح بها عن طريق البريد الإلكتروني، أو البريد العادي، أو الرسائل النصية، أو بنشرها على الموقع الإلكتروني أو التطبيق الهاتفي، سيتم اعتبار أنه تم إشعارك بمجرد استلامك للبريد الإلكتروني أو البريد العادي، أو بمجرد النشر على الموقع الإلكتروني أو التطبيق الهاتفي.'}
                  </DocumentText>
                </DocumentBlock>


                <DocumentBlock>
                  <DocumentTitle>
                    رابع عشر: الاختصاص القضائي:
                  </DocumentTitle>
                  <DocumentText>
                    {`أي نزاع ينشأ عن تطبيق هذه الاتفاقية، فيما يتعلق بالخدمات محل الموقع الإلكتروني أو التطبيق الهاتفي، يتم حله ودياً بين الطرفين ما أمكن خلال (7) أيام من تاريخ نشوئه، وفي حال تعذر ذلك يتقدم صاحب الشأن إلى الجهة المختصة، كما تسري أنظمة وقوانين المملكة العربية السعودية على أحكام هذه الاتفاقية، وتختص الجهة المختصة بمدينة الرياض بنظر أي نزاع قد ينشأ عن تطبيق هذه الاتفاقية، 
خامس عشر: الموافقة والتعهد:`}
                  </DocumentText>
                 
                  <DocumentList>
                    <DocumentListItem>
                      1- {'تمثل هذه الشروط والأحكام وتعديلاتها إن وجدت كامل الاتفاق معكم وتبطل كل ما سبقها من اتفاقيات شفهية أو كتابية.'}
                    </DocumentListItem>
                    <DocumentListItem>
                      2- {'إن عدم ممارسة شورى لأي من حقوقها أو مطالبتها بأي تعويض بموجب هذه الشروط والأحكام أو تأخرها في ممارسته أو عدم فرضها لهذه الشروط والأحكام أو تأخرها في فرضه أو تأخرها فيها لا يعني تنازلاً منها عمن أي مما ذكر.'}
                    </DocumentListItem>
                    <DocumentListItem>
                      3- {'إذا تبيّن أن أي بند أو جزء من هذه الاتفاقية غير صحيح، غير قابل للتنفيذ، أو باطل، تظل باقي أحكام هذه الشروط والأحكام نافذة وسارية.'}
                    </DocumentListItem>
                    <DocumentListItem>
                      4- {'إن استخدامك للموقع الإلكتروني أو التطبيق الهاتفي هو موافقة صريحة منكم بقبول جميع هذه الشروط والأحكام -المتضمنة لكافة التفاصيل السابق ذكرها- والعمل بموجبها والالتزام بما جاء فيها بعد الاطلاع عليها وفهم جميع ما ورد بها.'}
                    </DocumentListItem>
                    <DocumentListItem>
                      5- {'تتضمن هذه الشروط والأحكام الموافقة على (سياسة الخصوصية وملفات تعريف الارتباط) لذا نأمل منكم الاطلاع عليهم للمزيد من المعلومات من خلال الروابط أدناه.'}
                    </DocumentListItem>
                    <DocumentListItem>
                      6- {'كما أنك تتعهد بالامتثال لأية تعليمات أو إرشادات أو تعديلات أو إضافات حالية أو مستقبلية تصدر من شورى وفقاً لتقدير الأخيرة المطلق دون أدنى مسئولية عليها.'}
                    </DocumentListItem>
                  </DocumentList>

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