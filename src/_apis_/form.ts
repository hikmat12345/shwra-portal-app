type IFormData = {
    id: string;
    label: string;
    children:{ 
          id: string;
          label: string;
    }[]
}

export const formData :IFormData[]= [
    {
      id: "b17c9e87-6000-454a-beb6-3d46772d9488",
      label: "عقد",
      children: [
        {
          id: "afd2623c-62d0-4227-8130-1e325f969ac0",
          label: "صياغة"
        },
        {
          id: "4cd89cb3-7edb-454d-9bc9-86bf25b79a7a",
          label: "مراجعة"
        }
      ]
    },

    {
      id: "5f862344-0fec-49d6-938a-62b4d2462c78",
      label: "استشارة",
      children: []
    },
    {
      id: "67e46100-4d1a-419f-9c41-638d822c225a",
      label: "قضية",
      children: [
          {
            id: "4e359f5f-4603-49a6-8799-745ee5d129bb",
            label: "أحوال شخصية"
          },
          {
            id: "8bf1d904-50fa-43d2-afb1-a6787599d061",
            label: "الخلافات العمالية"
          },
          {
            id: "d3da05f4-6ae5-4043-8630-a37e9e8f2100",
            label: "القضايا التجارية"
          },
          {
            id: "d7020066-ddd0-4798-afc5-4dd6a430b244",
            label: "القضايا العقارية"
          },
          {
            id: "f509aa36-5d1e-4366-9dd4-0f6af0abbaf1",
            label: "قسمة التركات"
          },
          {
            id: "8a37dda1-6828-4a06-812a-5c7c01ad705c",
            label: "قضايا التأمين "
          },
          {
            id: "f96c71d7-79e2-4ad8-b569-383ff413f58b",
            label: "القضايا الجنائىة"
          },
          {
            id: "406c1c35-4799-4cb1-b663-c1f771af6816",
            label: "الأخطاء الطبية"
          }
      ]
    },
    {
      id: "d01211d0-4c48-4f9f-bd4c-be0e74fa8855",
      label: "مطالبات مالية",
      children: []
    },
    {
      id: "0372528e-0cc6-4944-a827-e9be5d1e29c8",
      label: "اخرى",
      children: []
    }
]
  