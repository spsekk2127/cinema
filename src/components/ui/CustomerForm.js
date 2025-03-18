import { useState } from "react";

const CustomerForm = ({ onSubmit, ticketInfo, selectedSeats }) => {

  // 訂票人資料
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
  });

  // 驗證錯誤
  const [errors, setErrors] = useState({});

  // 表單資料變更
  const handleChange = (e) => {
    // 取得表單資料
    const { name, value } = e.target;
    // 更新表單資料
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // 清除該欄位的錯誤訊息
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  // 驗證表單
  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = "請輸入姓名";
    }

    // 使用正規表驗證手機號碼
    // 09\d{8} -> 09開頭，後面接8個數字
    if (!formData.phone.trim()) {
      newErrors.phone = "請輸入電話";
    } else if (!/^09\d{8}$/.test(formData.phone)) {
      newErrors.phone = "請輸入有效的手機號碼";
    }

    // 使用正規表驗證電子郵件
    // \S+ ->@前要有字母或數字
    // @\S+ ->@後要有字母或數字
    // \.\S+ ->.後要有字母或數字
    if (!formData.email.trim()) {
      newErrors.email = "請輸入電子郵件";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "請輸入有效的電子郵件";
    }
    return newErrors;
  };

  // 提交表單
  const handleSubmit = (e) => {
    e.preventDefault();

    // 驗證表單錯誤
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    // 提交表單
    onSubmit({
      ...formData,
      ticketInfo,
      selectedSeats
    });
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg mt-6">
      <h2 className="text-xl font-bold mb-6 text-white">訂票人資料</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-lg font-bold text-gray-200 mb-1">
            姓名
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`w-full px-3 py-2 bg-gray-700 border ${
              errors.name ? 'border-red-500' : 'border-gray-600'
            } rounded-md text-white focus:outline-none focus:border-blue-500`}
            placeholder="請輸入姓名"
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-500">{errors.name}</p>
          )}
        </div>

        <div>
          <label className="block text-lg font-bold text-gray-200 mb-1">
            手機號碼
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className={`w-full px-3 py-2 bg-gray-700 border ${
              errors.phone ? 'border-red-500' : 'border-gray-600'
            } rounded-md text-white focus:outline-none focus:border-blue-500`}
            placeholder="請輸入手機號碼"
          />
          {errors.phone && (
            <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
          )}
        </div>

        <div>
          <label className="block text-lg font-bold text-gray-200 mb-1">
            電子郵件
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full px-3 py-2 bg-gray-700 border ${
              errors.email ? 'border-red-500' : 'border-gray-600'
            } rounded-md text-white focus:outline-none focus:border-blue-500`}
            placeholder="請輸入電子郵件"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-500">{errors.email}</p>
          )}
        </div>

        <div className="pt-4">
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition-colors font-medium"
          >
            確認訂票
          </button>
        </div>
      </form>
    </div>
  );
};

export default CustomerForm; 