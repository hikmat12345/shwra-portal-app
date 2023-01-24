import { random, sample } from 'lodash';
// utils
import mock from './mock';
import mockData from '../utils/mock-data';


// ----------------------------------------------------------------------
/**
 * @req get all tecket by user
 */
mock.onGet('/api/ticket/all').reply(() => {

  const tickets = [
    {
      id: "1",
      title: "الابلا لابلافق يلابل",
      details: "ال بي لبيليبل",
      standard: "عقد",
      type: "مستعجل",
      create_at: `${Date.now()}`,
      updated_at: `${Date.now()}`
    },
    {
      id: "2",
      title: "الابلا لابلافق يلابل",
      details: "ال بي لبيليبل",
      standard: "عقد",
      type: "مستعجل",
      create_at: `${Date.now()}`,
      updated_at: `${Date.now()}`
    },
    {
      id: "3",
      title: "الابلا لابلافق يلابل",
      details: "ال بي لبيليبل",
      standard: "عقد",
      type: "مستعجل",
      create_at: `${Date.now()}`,
      updated_at: `${Date.now()}`
    },
    {
      id: "4",
      title: "الابلا لابلافق يلابل",
      details: "ال بي لبيليبل",
      standard: "عقد",
      type: "مستعجل",
      create_at: `${Date.now()}`,
      updated_at: `${Date.now()}`
    },
    {
      id: "5",
      title: "الابلا لابلافق يلابل",
      details: "ال بي لبيليبل",
      standard: "عقد",
      type: "مستعجل",
      create_at: `${Date.now()}`,
      updated_at: `${Date.now()}`
    },
    {
      id: "6",
      title: "الابلا لابلافق يلابل",
      details: "ال بي لبيليبل",
      standard: "عقد",
      type: "مستعجل",
      create_at: `${Date.now()}`,
      updated_at: `${Date.now()}`
    },
    {
      id: "7",
      title: "الابلا لابلافق يلابل",
      details: "ال بي لبيليبل",
      standard: "عقد",
      type: "مستعجل",
      create_at: `${Date.now()}`,
      updated_at: `${Date.now()}`
    },
    {
      id: "8",
      title: "الابلا لابلافق يلابل",
      details: "ال بي لبيليبل",
      standard: "عقد",
      type: "مستعجل",
      create_at: `${Date.now()}`,
      updated_at: `${Date.now()}`
    },
    {
      id: "9",
      title: "الابلا لابلافق يلابل",
      details: "ال بي لبيليبل",
      standard: "عقد",
      type: "مستعجل",
      create_at: `${Date.now()}`,
      updated_at: `${Date.now()}`
    },
    {
      id: "10",
      title: "الابلا لابلافق يلابل",
      details: "ال بي لبيليبل",
      standard: "عقد",
      type: "مستعجل",
      create_at: `${Date.now()}`,
      updated_at: `${Date.now()}`
    },
    {
      id: "11",
      title: "الابلا لابلافق يلابل",
      details: "ال بي لبيليبل",
      standard: "عقد",
      type: "مستعجل",
      create_at: `${Date.now()}`,
      updated_at: `${Date.now()}`
    },
    {
      id: "12",
      title: "الابلا لابلافق يلابل",
      details: "ال بي لبيليبل",
      standard: "عقد",
      type: "مستعجل",
      create_at: `${Date.now()}`,
      updated_at: `${Date.now()}`
    },
    {
      id: "13",
      title: "الابلا لابلافق يلابل",
      details: "ال بي لبيليبل",
      standard: "عقد",
      type: "مستعجل",
      create_at: `${Date.now()}`,
      updated_at: `${Date.now()}`
    },
    {
      id: "14",
      title: "الابلا لابلافق يلابل",
      details: "ال بي لبيليبل",
      standard: "عقد",
      type: "مستعجل",
      create_at: `${Date.now()}`,
      updated_at: `${Date.now()}`
    },
    {
      id: "15",
      title: "الابلا لابلافق يلابل",
      details: "ال بي لبيليبل",
      standard: "عقد",
      type: "مستعجل",
      create_at: "",
      updated_at: ""
    }
  ]
  
    return [200, { tickets }];
  });
  




/**
 * @req get tecket by id
 */
mock.onGet('/api/ticket/1').reply(() => {

    const ticket = {
        id: '1',
        title: 'عنوان الاستشاره هنا ....',
        details: "ال بي لبيليبل",
        standard: "عقد",
        type: "مستعجل",
        attachments: [],
        replies: [],
        create_at: `${Date.now()}`,
        updated_at: `${Date.now()}`
    }

    return [200, { ticket }];
});
