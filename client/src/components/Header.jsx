import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { FaMoon } from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import { RxAvatar } from "react-icons/rx";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const [openDropdown, setOpenDropdown] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);
  const searchInputRef = useRef(null);
  const searchIconRef = useRef(null);
  const navigate = useNavigate();
  const handleDropdown = () => {
    setOpenDropdown(!openDropdown);
  };
  const closeSearchInput = (e) => {
    if (openSearch && !searchInputRef.current?.contains(e.target)) {
      setOpenSearch(false);
    }
  };

  useEffect(() => {
    if (openSearch && searchInputRef.current) {
      searchInputRef.current.focus();
      document.addEventListener("mousedown", closeSearchInput);
    }
  });

  return (
    <header className="w-full h-[52px] border-b-[1.5px] flex justify-center relative">
      <div className="width-wrapper flex items-center justify-between h-full lg:p-0 px-4">
        {/* small device more */}
        <div
          className="lg:hidden h-full flex items-center cursor-pointer"
          onClick={() => handleDropdown()}
        >
          {openDropdown ? (
            <IoClose fontSize={24} />
          ) : (
            <BsThreeDots fontSize={24} />
          )}
        </div>
        {/* logo */}
        <h1 className="w-[180px]">
          <a
            href="/"
            title="Tri thức trực tuyến - Thông tin uy tín, hình ảnh ấn tượng"
          >
            <img
              src="https://static.znews.vn/images/logo-znews-light-2.svg"
              alt="logo"
            />
          </a>
        </h1>
        {/* nav */}
        <nav className="h-full flex-1 lg:flex justify-center hidden">
          <ul className="flex gap-4 font-semibold h-full">
            <li>
              <a href="/" className="nav-link">
                Xuat ban
              </a>
            </li>
            <li>
              <a href="/" className="nav-link">
                Xuat ban
              </a>
            </li>
            <li>
              <a href="/" className="nav-link">
                Xuat ban
              </a>
            </li>
            <li>
              <a href="/" className="nav-link">
                Xuat ban
              </a>
            </li>

            <li className="flex items-center">
              <motion.div
                onClick={() => setOpenDropdown((pv) => !pv)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <motion.div
                  animate={{ rotate: openDropdown ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="cursor-pointer"
                >
                  {openDropdown ? (
                    <IoClose size={24} />
                  ) : (
                    <BsThreeDots size={24} />
                  )}
                </motion.div>
              </motion.div>
            </li>
          </ul>
        </nav>

        {/* search */}
        <div className="flex relative h-full items-center gap-2">
          <div
            className="absolute right-2 cursor-pointer z-10 "
            ref={searchIconRef}
          >
            {openSearch ? (
              <IoClose fontSize={28} color="white" />
            ) : (
              <IoIosSearch
                id="search-icon"
                fontSize={28}
                onClick={() => setOpenSearch((pv) => !pv)}
              />
            )}
          </div>
          <motion.input
            ref={searchInputRef}
            initial={{ width: 0, opacity: 0 }}
            animate={{
              width: openSearch ? "auto" : 0,
              opacity: openSearch ? 1 : 0,
            }}
            transition={{ duration: 0.5 }}
            type="text"
            className="w-[300px] h-[36px] outline-none rounded-lg bg-slate-700 text-slate-200 px-3 text-sm absolute right-0"
          />

          {/* sign in */}
          <div
            className="flex items-center gap-1 cursor-pointer hover:text-cyan-500 duration-200"
            onClick={() => navigate("/sign-in")}
          >
            <RxAvatar size={20} />
            <span>Đăng&nbsp;nhập</span>
          </div>

          {/* dark mode */}
          <button className="mr-10 border w-full h-[70%] rounded-full px-3 hover:border-cyan-500 duration-200">
            <FaMoon size={14} />
          </button>
        </div>
      </div>

      {/* dropdown */}
      <motion.div
        initial={wrapperVariants.closed}
        variants={wrapperVariants}
        animate={openDropdown ? "open" : "closed"}
        className="absolute top-full w-full bg-[#141329] text-white py-4"
      >
        <div className="max-w-[865px] grid grid-cols-4 gap-4 place-items-center mx-auto">
          <motion.div
            variants={itemVariants}
            className="relative flex items-center font-semibold text-lg"
          >
            <div className="before:content-[''] -skew-x-[20deg] bg-red-600 w-[4px] h-[12px] mr-[7px]"></div>
            <a href="/">Xuat ban</a>
          </motion.div>
        </div>
      </motion.div>
    </header>
  );
}

const wrapperVariants = {
  open: {
    scaleY: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.1,
    },
  },
  closed: {
    scaleY: 0,
    transition: {
      when: "afterChildren",
      staggerChildren: 0.1,
    },
  },
};
const itemVariants = {
  open: {
    opacity: 1,
    y: 0,
    transition: {
      when: "beforeChildren",
    },
  },
  closed: {
    opacity: 0,
    y: -15,
    transition: {
      when: "afterChildren",
    },
  },
};
