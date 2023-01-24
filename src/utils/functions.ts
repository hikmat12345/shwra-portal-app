import { createFileUrl } from "components/file/FilePreview";

export const getSpecificKeyInArrayOfObjects = (array: [], keyName: string) => {
  let permittedValues: [] = [];
  for (let i = 0; i < array.length; i++) {
    permittedValues[i] = array[i][`${keyName}`];
  }
  return permittedValues;
};

export const colorizeAdminAppontmentStatus = (id: number) => {
  switch (id) {
    case 0:
      return 'primary';
    case 1:
      return 'warning';
    case 2:
      return 'info';
    case 3:
      return 'error';
    case 4:
      return 'default';
    case 5:
      return 'success';
  }
};
export const colorizeLawyerStatus = (id: number) => {
  switch (id) {
    case 0:
      return 'primary';
    case 1:
      return 'success';
    case 2:
      return 'error';
  }
};

export const getDayDate = (
  day: 'saturday' | 'sunday' | 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday',
  hour: number,
  minute: number
) => {
  const today = new Date();
  const getDay = today.getDay() === 6 ? 6 : -1;
  const first = today.getDate() - today.getDay() + getDay;
  switch (day) {
    case 'saturday':
      return new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        first,
        hour,
        minute
      ).toJSON();
    case 'sunday':
      return new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        first + 1,
        hour,
        minute
      ).toJSON();
    case 'monday':
      return new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        first + 2,
        hour,
        minute
      ).toJSON();
    case 'tuesday':
      return new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        first + 3,
        hour,
        minute
      ).toJSON();
    case 'wednesday':
      return new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        first + 4,
        hour,
        minute
      ).toJSON();
    case 'thursday':
      return new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        first + 5,
        hour,
        minute
      ).toJSON();
    case 'friday':
      return new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        first + 6,
        hour,
        minute
      ).toJSON();
  }
};


export  const getData = async (fileName:string, setState?: (image: any)=> void) => {
  const image: any = await createFileUrl({
    fileName: fileName,
    type: 'image'
  });
  image.onload = () => {
    try {
      const profileImage = image.result;
      setState && setState(profileImage)
    } catch (err) {
      
    }
  };

};