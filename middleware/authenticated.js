export default function ({ store, redirect }) {
  if(!store.getters["authentication/existAccessToken"]) return redirect('/login');
}
