
export default function Profile() {
  return (
    <div className="max-w-lg m-auto">
      <h1 className="text-3xl font-semibold text-center py-8"> Profile </h1>
      <form className="flex flex-col gap-4">
      <img className="w-24 h-24 rounded-full object-cover cursor-pointer self-center mb-7" src="https://www.nj.com/resizer/zovGSasCaR41h_yUGYHXbVTQW2A=/1280x0/smart/cloudfront-us-east-1.images.arcpublishing.com/advancelocal/SJGKVE5UNVESVCW7BBOHKQCZVE.jpg" alt="profile" />
      <input type="text" placeholder="username" name="username" className="p-3 rounded-lg focus:outline-none"/>
      <input type="text" placeholder="email" name="email" className="p-3 rounded-lg focus:outline-none"/>
      <input type="text" placeholder="password" name="password" className="p-3 rounded-lg focus:outline-none"/>
      <button className="bg-slate-900 hover:bg-opacity-90 text-white uppercase p-3 rounded-lg font-semibold"> Update </button>
      </form>
      <div className="mt-7 flex justify-between">
        <button className="bg-red-900 hover:bg-opacity-90 text-white p-2 uppercase rounded-lg font-semibold"> Delete Account </button>
        <button className="bg-red-900 hover:bg-opacity-90 text-white p-2 uppercase rounded-lg font-semibold"> Sign Out </button>
      </div>
    </div>
  )
}
