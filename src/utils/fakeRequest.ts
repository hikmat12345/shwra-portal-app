// ----------------------------------------------------------------------

export default function fakeRequest(time: number) {
  return new Promise((res) => setTimeout(res, time));
}
