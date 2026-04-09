import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  CreditCard,
  HelpCircle,
  ChevronDown,
  ChevronRight,
  Home,
  Layout,
  Type,
  Image,
  Square,
  Move,
  Maximize2,
  ZoomIn,
  Palette,
  Download,
  Upload,
  Save,
  Trash2,
  Copy,
  Undo2,
  Redo2,
  ChevronUp,
  Settings,
  Lock,
  FileImage,
  FileText,
  RefreshCw,
  Check
} from 'lucide-react';

const Section = ({ icon: Icon, title, color = 'indigo', children, defaultOpen = false }) => {
  const [open, setOpen] = useState(defaultOpen);

  const colorMap = {
    indigo: { bg: 'bg-indigo-50', border: 'border-indigo-200', icon: 'text-indigo-600', title: 'text-indigo-800', btn: 'hover:bg-indigo-100' },
    emerald: { bg: 'bg-emerald-50', border: 'border-emerald-200', icon: 'text-emerald-600', title: 'text-emerald-800', btn: 'hover:bg-emerald-100' },
    amber: { bg: 'bg-amber-50', border: 'border-amber-200', icon: 'text-amber-600', title: 'text-amber-800', btn: 'hover:bg-amber-100' },
    rose: { bg: 'bg-rose-50', border: 'border-rose-200', icon: 'text-rose-600', title: 'text-rose-800', btn: 'hover:bg-rose-100' },
    violet: { bg: 'bg-violet-50', border: 'border-violet-200', icon: 'text-violet-600', title: 'text-violet-800', btn: 'hover:bg-violet-100' },
    sky: { bg: 'bg-sky-50', border: 'border-sky-200', icon: 'text-sky-600', title: 'text-sky-800', btn: 'hover:bg-sky-100' },
  };

  const c = colorMap[color];

  return (
    <div className={`rounded-xl border ${c.border} overflow-hidden`}>
      <button
        onClick={() => setOpen(!open)}
        className={`w-full flex items-center justify-between p-5 ${c.bg} ${c.btn} transition-colors text-left`}
      >
        <div className="flex items-center gap-3">
          <Icon size={22} className={c.icon} />
          <span className={`text-base font-semibold ${c.title}`}>{title}</span>
        </div>
        {open ? <ChevronDown size={18} className="text-gray-500" /> : <ChevronRight size={18} className="text-gray-500" />}
      </button>
      {open && (
        <div className="p-5 bg-white border-t border-gray-100 space-y-4">
          {children}
        </div>
      )}
    </div>
  );
};

const Step = ({ number, title, description, tip }) => (
  <div className="flex gap-4">
    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center text-sm font-bold">
      {number}
    </div>
    <div className="flex-1">
      <p className="font-medium text-gray-800">{title}</p>
      <p className="text-sm text-gray-600 mt-0.5">{description}</p>
      {tip && (
        <div className="mt-2 flex items-start gap-2 text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">
          <span className="font-bold mt-0.5">💡</span>
          <span>{tip}</span>
        </div>
      )}
    </div>
  </div>
);

const FeatureRow = ({ icon: Icon, label, description, iconColor = 'text-indigo-600' }) => (
  <div className="flex items-start gap-3 py-2 border-b border-gray-100 last:border-0">
    <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
      <Icon size={16} className={iconColor} />
    </div>
    <div>
      <span className="text-sm font-medium text-gray-800">{label}</span>
      <p className="text-xs text-gray-500 mt-0.5">{description}</p>
    </div>
  </div>
);

const Badge = ({ text, color = 'indigo' }) => {
  const colorMap = {
    indigo: 'bg-indigo-100 text-indigo-700',
    emerald: 'bg-emerald-100 text-emerald-700',
    amber: 'bg-amber-100 text-amber-700',
    rose: 'bg-rose-100 text-rose-700',
  };
  return (
    <span className={`inline-block text-xs font-semibold px-2 py-0.5 rounded-full ${colorMap[color]}`}>
      {text}
    </span>
  );
};

const HelpPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <HelpCircle size={26} className="text-indigo-600" />
              <h1 className="text-lg font-bold text-gray-800">Hướng dẫn sử dụng</h1>
              <span className="hidden sm:block text-gray-400 text-sm">| Dynamic Card Creator</span>
            </div>
            <Link
              to="/"
              className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white text-sm rounded-lg hover:bg-indigo-700 transition-colors"
            >
              <Home size={16} />
              Về trang chủ
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-6">

        {/* Hero Banner */}
        <div className="rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 p-8 text-white shadow-lg">
          <div className="flex items-start gap-4">
            <CreditCard size={48} className="flex-shrink-0 opacity-90" />
            <div>
              <h2 className="text-2xl font-bold">Dynamic Card Creator</h2>
              <p className="mt-2 text-indigo-100 leading-relaxed">
                Ứng dụng tạo thẻ danh thiếp cá nhân trực tuyến — chọn mẫu có sẵn, điền thông tin, xuất file.
                Không cần đăng nhập, không cần cài đặt thêm.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <Badge text="6 mẫu sẵn có" color="indigo" />
                <Badge text="Kéo thả tự do" color="indigo" />
                <Badge text="Xuất PNG / JPG / PDF" color="indigo" />
                <Badge text="Không cần backend" color="indigo" />
              </div>
            </div>
          </div>
        </div>

        {/* Quick Overview */}
        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
          <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <CreditCard size={18} className="text-indigo-600" /> Tổng quan ứng dụng
          </h3>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="rounded-lg border border-indigo-100 bg-indigo-50 p-4">
              <p className="font-medium text-indigo-800 mb-1">🎨 Trang Card Creator <span className="text-xs text-indigo-500 font-normal">(/ — trang chủ)</span></p>
              <p className="text-sm text-indigo-700">Người dùng phổ thông chọn mẫu template, điền thông tin cá nhân và xuất thẻ ra file ảnh hoặc PDF.</p>
            </div>
            <div className="rounded-lg border border-violet-100 bg-violet-50 p-4">
              <p className="font-medium text-violet-800 mb-1">⚙️ Trang Template Manager <span className="text-xs text-violet-500 font-normal">(/manager — cần đăng nhập)</span></p>
              <p className="text-sm text-violet-700">Quản trị viên thiết kế template mới từ đầu: thêm/sửa/xóa phần tử, tùy chỉnh nền, lưu template.</p>
            </div>
          </div>
        </div>

        {/* Section 1: Card Creator */}
        <Section icon={CreditCard} title="Trang Card Creator — Tạo thẻ nhanh" color="indigo" defaultOpen={true}>
          <p className="text-sm text-gray-600 -mt-1">
            Truy cập tại địa chỉ <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs">/</code> (trang chủ). Không cần đăng nhập.
          </p>
          <div className="space-y-4 mt-2">
            <Step
              number="1"
              title="Chọn template"
              description='Ở cột trái, cuộn danh sách các mẫu thẻ. Nhấn vào một mẫu để chọn — mẫu đang chọn sẽ hiện dấu tick màu xanh.'
              tip="Có 6 mẫu mặc định: Professional Blue, Minimalist White, Dark Elegant, Colorful Creative, Nature Green, Tech Futuristic. Các template do admin tạo thêm cũng xuất hiện ở đây."
            />
            <Step
              number="2"
              title="Điền thông tin"
              description={"Sau khi chọn mẫu, khung \"Fill in Data\" xuất hiện bên dưới danh sách. Điền nội dung cho từng trường text hoặc thay ảnh bằng URL / tải ảnh từ máy."}  
              tip="Mỗi template có các trường khác nhau. Thay đổi sẽ hiển thị ngay lập tức trên thẻ xem trước."
            />
            <Step
              number="3"
              title="Xem trước & xuất thẻ"
              description='Cột giữa hiển thị thẻ đã hoàn thiện. Nhấn "Reset" để quay về nội dung gốc của template. Chọn định dạng xuất: PNG, JPG hoặc PDF.'
              tip="Ảnh xuất ra có độ phân giải cao (scale 4x) — đảm bảo sắc nét khi in."
            />
          </div>

          <div className="mt-4 rounded-lg bg-gray-50 border border-gray-200 p-4">
            <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-3">Các nút xuất file</p>
            <div className="grid grid-cols-3 gap-3">
              <div className="flex flex-col items-center gap-1 p-3 rounded-lg bg-emerald-50 border border-emerald-200">
                <FileImage size={20} className="text-emerald-600" />
                <span className="text-xs font-medium text-emerald-700">Export PNG</span>
                <span className="text-xs text-gray-500 text-center">Ảnh nền trong suốt, chất lượng cao</span>
              </div>
              <div className="flex flex-col items-center gap-1 p-3 rounded-lg bg-amber-50 border border-amber-200">
                <Image size={20} className="text-amber-600" />
                <span className="text-xs font-medium text-amber-700">Export JPG</span>
                <span className="text-xs text-gray-500 text-center">Ảnh nén nhẹ hơn, dùng tốt khi chia sẻ</span>
              </div>
              <div className="flex flex-col items-center gap-1 p-3 rounded-lg bg-red-50 border border-red-200">
                <FileText size={20} className="text-red-600" />
                <span className="text-xs font-medium text-red-700">Export PDF</span>
                <span className="text-xs text-gray-500 text-center">Định dạng in ấn chuyên nghiệp</span>
              </div>
            </div>
          </div>
        </Section>

        {/* Section 2: Manager Login */}
        <Section icon={Lock} title="Đăng nhập vào Template Manager" color="violet">
          <p className="text-sm text-gray-600">
            Nhấn nút <strong>Manager</strong> (biểu tượng bánh răng) ở góc trên phải trang chủ, hoặc truy cập thẳng vào{' '}
            <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs">/login</code>.
          </p>
          <div className="mt-3 rounded-lg border border-gray-200 overflow-hidden">
            <div className="bg-gray-50 px-4 py-2 border-b border-gray-200">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Thông tin đăng nhập mặc định</p>
            </div>
            <div className="p-4 grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-gray-500 mb-1">Tài khoản</p>
                <code className="text-sm font-bold text-indigo-700 bg-indigo-50 px-3 py-1.5 rounded block">admin</code>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Mật khẩu</p>
                <code className="text-sm font-bold text-indigo-700 bg-indigo-50 px-3 py-1.5 rounded block">admin@123</code>
              </div>
            </div>
          </div>
          {/* <div className="mt-3 flex items-start gap-2 text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">
            <span className="font-bold">⚠️</span>
            <span>
              Thông tin đăng nhập có thể được cấu hình qua biến môi trường{' '}
              <code className="bg-amber-100 px-1 rounded">VITE_ACCOUNT</code> và{' '}
              <code className="bg-amber-100 px-1 rounded">VITE_PASSWORD</code> trong file <code className="bg-amber-100 px-1 rounded">.env</code>.
            </span>
          </div> */}
        </Section>

        {/* Section 3: Manager - Elements */}
        <Section icon={Layout} title="Template Manager — Thêm & chỉnh sửa phần tử" color="emerald">
          <p className="text-sm text-gray-600 -mt-1">
            Giao diện Manager gồm 3 khu vực: <strong>Panel mẫu</strong> (trái) · <strong>Canvas thiết kế</strong> (giữa) · <strong>Panel thuộc tính</strong> (phải).
          </p>

          <div className="space-y-3 mt-2">
            <p className="text-sm font-medium text-gray-700">Thêm phần tử mới (panel phải — mục "Add Elements"):</p>
            <div className="space-y-1">
              <FeatureRow icon={Type} iconColor="text-blue-600" label="Text — Thêm văn bản" description='Thêm hộp chữ mới với nội dung "New Text". Có thể chỉnh nội dung, font size, màu, canh lề ngang/dọc.' />
              <FeatureRow icon={Image} iconColor="text-purple-600" label="Image — Thêm ảnh" description="Nhập URL ảnh hoặc tải ảnh từ máy tính. Hỗ trợ điều chỉnh border-radius để bo tròn góc." />
              <FeatureRow icon={Square} iconColor="text-orange-600" label="Shape — Thêm hình trang trí" description="Thêm hình chữ nhật / hình bo tròn làm trang trí. Có thể đặt màu nền và border-radius." />
            </div>
          </div>

          <div className="space-y-3 mt-4">
            <p className="text-sm font-medium text-gray-700">Thao tác trên phần tử đã chọn:</p>
            <div className="space-y-1">
              <FeatureRow icon={Move} iconColor="text-indigo-600" label="Kéo thả (Drag & Drop)" description="Nhấn giữ và kéo phần tử bất kỳ trên canvas để đặt lại vị trí." />
              <FeatureRow icon={Maximize2} iconColor="text-teal-600" label="Resize — Thay đổi kích thước" description="Kéo chấm tròn màu xanh ở góc dưới-phải của phần tử đang chọn." />
              <FeatureRow icon={ZoomIn} iconColor="text-violet-600" label="Scale — Thu phóng" description="Dùng nút +/− trong mục Scale để thay đổi tỷ lệ từ 10% đến 300%, không ảnh hưởng phần tử khác." />
              <FeatureRow icon={Copy} iconColor="text-sky-600" label="Duplicate — Nhân bản" description="Tạo bản sao của phần tử, lệch 20px sang phải và xuống dưới so với bản gốc." />
              <FeatureRow icon={ChevronUp} iconColor="text-emerald-600" label="Layer Up / Down — Đổi lớp" description="Dịch chuyển phần tử lên hoặc xuống trong danh sách z-index (lớp trên che lớp dưới)." />
              <FeatureRow icon={Trash2} iconColor="text-red-500" label="Delete — Xóa phần tử" description="Xóa phần tử đang chọn khỏi canvas. Có thể hoàn tác bằng Undo." />
            </div>
          </div>

          <div className="mt-4 rounded-lg bg-gray-50 border border-gray-200 p-4">
            <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-2">Nhập tọa độ & kích thước chính xác</p>
            <p className="text-sm text-gray-600">
              Trong panel phải, các trường <strong>X</strong>, <strong>Y</strong>, <strong>Width</strong>, <strong>Height</strong> cho phép nhập giá trị pixel chính xác — hữu ích khi cần căn chỉnh pixel-perfect.
            </p>
          </div>
        </Section>

        {/* Section 4: Text Properties */}
        <Section icon={Type} title="Thuộc tính phần tử Text" color="sky">
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              { label: 'Content', desc: 'Nội dung văn bản hiển thị trên thẻ.' },
              { label: 'Font Size', desc: 'Cỡ chữ tính bằng pixel (px).' },
              { label: 'Color', desc: 'Màu chữ, chọn qua bảng màu hoặc nhập mã hex.' },
              { label: 'Font Weight', desc: 'Độ đậm: Normal, Bold, Light.' },
              { label: 'Text Align', desc: 'Căn chỉnh ngang: Left, Center, Right.' },
              { label: 'Vertical Align', desc: 'Căn chỉnh dọc trong hộp: Top, Middle, Bottom.' },
            ].map((item) => (
              <div key={item.label} className="flex gap-3 items-start p-3 bg-gray-50 rounded-lg border border-gray-100">
                <Check size={14} className="text-sky-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-gray-800">{item.label}</p>
                  <p className="text-xs text-gray-500">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* Section 5: Background */}
        <Section icon={Palette} title="Tùy chỉnh nền thẻ (Card Background)" color="amber">
          <div className="space-y-3">
            <div className="flex gap-3 items-start p-3 bg-amber-50 rounded-lg border border-amber-100">
              <div className="w-8 h-8 rounded-lg bg-blue-400 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-gray-800">Color — Màu đơn</p>
                <p className="text-xs text-gray-600">Chọn màu nền qua bảng màu hoặc nhập mã HEX. Ví dụ: <code className="bg-gray-100 px-1 rounded">#1a1a2e</code></p>
              </div>
            </div>
            <div className="flex gap-3 items-start p-3 bg-amber-50 rounded-lg border border-amber-100">
              <div className="w-8 h-8 rounded-lg flex-shrink-0" style={{ background: 'linear-gradient(135deg, #667eea, #764ba2)' }} />
              <div>
                <p className="text-sm font-medium text-gray-800">Gradient — Màu chuyển sắc</p>
                <p className="text-xs text-gray-600">Chọn từ 6 preset gradient có sẵn. Màu đang dùng sẽ có viền xanh.</p>
              </div>
            </div>
            <div className="flex gap-3 items-start p-3 bg-amber-50 rounded-lg border border-amber-100">
              <div className="w-8 h-8 rounded-lg bg-gray-200 flex-shrink-0 flex items-center justify-center">
                <Image size={14} className="text-gray-500" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-800">Image — Ảnh nền</p>
                <p className="text-xs text-gray-600">Nhập URL ảnh hoặc tải ảnh từ máy tính. Ảnh sẽ được crop và fill toàn bộ nền thẻ.</p>
              </div>
            </div>
          </div>
          <div className="mt-3 flex items-start gap-2 text-xs text-gray-600 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2">
            <span>ℹ️</span>
            <span>Có thể điều chỉnh kích thước thẻ qua mục <strong>Card Size</strong> (Width × Height tính bằng px). Mặc định là 400×250px.</span>
          </div>
        </Section>

        {/* Section 6: Save / Import / Export Template */}
        <Section icon={Save} title="Lưu, Import & Export template" color="rose">
          <div className="space-y-4">
            <div>
              <p className="text-sm font-semibold text-gray-800 mb-2 flex items-center gap-2">
                <Save size={16} className="text-rose-500" /> Lưu template mới
              </p>
              <p className="text-sm text-gray-600">
                Nhấn nút <strong>"Save as Template"</strong> ở cuối panel trái → nhập tên template → nhấn <strong>Save</strong>. Template mới sẽ xuất hiện trong danh sách và cũng được lưu vào <code className="bg-gray-100 px-1 rounded text-xs">localStorage</code> của trình duyệt.
              </p>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-800 mb-2 flex items-center gap-2">
                <Download size={16} className="text-indigo-500" /> Export JSON
              </p>
              <p className="text-sm text-gray-600">
                Nhấn <strong>"Export JSON"</strong> trên thanh header để tải xuống file <code className="bg-gray-100 px-1 rounded text-xs">.json</code> chứa toàn bộ cấu trúc template. File này có thể chia sẻ hoặc dùng lại.
              </p>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-800 mb-2 flex items-center gap-2">
                <Upload size={16} className="text-emerald-500" /> Import JSON
              </p>
              <p className="text-sm text-gray-600">
                Nhấn <strong>"Import"</strong> trên header → tải file JSON lên hoặc dán nội dung JSON vào ô text → nhấn <strong>"Import Template"</strong>. Template nhập vào sẽ có hậu tố <em>(Imported)</em>.
              </p>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-800 mb-2 flex items-center gap-2">
                <Trash2 size={16} className="text-red-500" /> Xóa template
              </p>
              <p className="text-sm text-gray-600">
                Di chuột vào thumbnail template trong panel trái → nhấn nút <strong>thùng rác đỏ</strong> góc trên phải. Lưu ý: 6 template mặc định không thể xóa.
              </p>
            </div>
          </div>
        </Section>

        {/* Section 7: Undo/Redo */}
        <Section icon={Undo2} title="Undo / Redo — Hoàn tác & Làm lại" color="sky">
          <div className="flex gap-6">
            <div className="flex-1 flex gap-3 items-start">
              <div className="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
                <Undo2 size={18} className="text-gray-700" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-800">Undo</p>
                <p className="text-xs text-gray-600">Hoàn tác thao tác vừa thực hiện. Nút bị mờ khi không có gì để undo.</p>
              </div>
            </div>
            <div className="flex-1 flex gap-3 items-start">
              <div className="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
                <Redo2 size={18} className="text-gray-700" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-800">Redo</p>
                <p className="text-xs text-gray-600">Làm lại thao tác vừa hoàn tác. Nút bị mờ khi không có gì để redo.</p>
              </div>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-3 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2">
            ℹ️ Lịch sử lưu tối đa 50 bước. Undo/Redo chỉ áp dụng cho các thay đổi trên canvas trong phiên làm việc hiện tại.
          </p>
        </Section>

        {/* Section 8: Export Card from Manager */}
        <Section icon={Download} title="Xuất thẻ từ Template Manager" color="emerald">
          <p className="text-sm text-gray-600">
            Trong Manager, panel phải có mục <strong>"Export Card"</strong> với 3 định dạng. Thẻ xuất ra sẽ phản ánh đúng trạng thái canvas tại thời điểm nhấn nút.
          </p>
          <div className="mt-3 grid grid-cols-3 gap-3">
            <div className="flex flex-col items-center gap-1 p-3 rounded-lg bg-emerald-50 border border-emerald-200">
              <FileImage size={20} className="text-emerald-600" />
              <span className="text-xs font-medium text-emerald-700">PNG</span>
            </div>
            <div className="flex flex-col items-center gap-1 p-3 rounded-lg bg-amber-50 border border-amber-200">
              <Image size={20} className="text-amber-600" />
              <span className="text-xs font-medium text-amber-700">JPG</span>
            </div>
            <div className="flex flex-col items-center gap-1 p-3 rounded-lg bg-red-50 border border-red-200">
              <FileText size={20} className="text-red-600" />
              <span className="text-xs font-medium text-red-700">PDF</span>
            </div>
          </div>
        </Section>

        {/* Section 9: FAQ */}
        <Section icon={HelpCircle} title="Câu hỏi thường gặp (FAQ)" color="violet">
          <div className="space-y-4">
            {[
              {
                q: 'Dữ liệu có bị mất khi tắt trình duyệt không?',
                a: 'Template do bạn tạo và lưu sẽ được giữ trong localStorage của trình duyệt. Tuy nhiên dữ liệu điền vào thẻ ở trang chủ chỉ tồn tại trong phiên làm việc — sẽ mất khi reload trang.'
              },
              {
                q: 'Có thể dùng ảnh từ máy tính không?',
                a: 'Có. Ở cả trang Card Creator và Template Manager, bạn đều có thể tải ảnh từ máy tính lên. Ảnh sẽ được chuyển thành base64 và lưu trực tiếp trong trạng thái ứng dụng.'
              },
              {
                q: 'Template mặc định có thể sửa không?',
                a: 'Bạn có thể chỉnh sửa template mặc định trên canvas, nhưng muốn lưu lại phải dùng "Save as Template" với tên mới. Template mặc định không thể xóa.'
              },
              {
                q: 'Ảnh xuất ra bị mờ hoặc vỡ nét không?',
                a: 'Không. Ứng dụng render ảnh với scale 4x trước khi xuất, đảm bảo độ phân giải cao cho cả PNG, JPG và PDF.'
              },
              {
                q: 'Có thể chia sẻ template cho người khác không?',
                a: 'Có. Export template ra file JSON rồi gửi file đó cho người dùng khác. Họ dùng tính năng Import JSON để nạp template vào ứng dụng của mình.'
              },
              {
                q: 'Phiên đăng nhập Manager có hết hạn không?',
                a: 'Phiên đăng nhập sử dụng sessionStorage — sẽ tự xóa khi đóng tab/trình duyệt. Mở lại trình duyệt sẽ cần đăng nhập lại.'
              },
            ].map((item, i) => (
              <div key={i} className="rounded-lg border border-gray-200 overflow-hidden">
                <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
                  <p className="text-sm font-medium text-gray-800">❓ {item.q}</p>
                </div>
                <div className="px-4 py-3">
                  <p className="text-sm text-gray-600">{item.a}</p>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* Footer */}
        <div className="text-center py-4 text-sm text-gray-400">
          Dynamic Card Creator · Tài liệu hướng dẫn · Mọi dữ liệu lưu trên trình duyệt, không cần backend
        </div>
      </div>
    </div>
  );
};

export default HelpPage;
