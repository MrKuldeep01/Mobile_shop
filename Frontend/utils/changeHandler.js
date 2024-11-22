const changeHandler = (e) => {
  const key = e.target.name;
  const value = e.target.type === "file" ? e.target.files[0] : e.target.value;
  // formData.set(key, value);
  return { key, value };
  // console.log("Updated FormData:", Array.from(formData.entries()));
};

export default changeHandler;
