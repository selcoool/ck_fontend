import React from 'react'

function ErrorPage() {
  return (
    <div>
      ErrorPage
    </div>
  )
}

export default ErrorPage



// import React, { useEffect, useRef, useState } from 'react';
// import { PlusOutlined } from '@ant-design/icons';
// import { Input, Tag, theme } from 'antd';
// import { TweenOneGroup } from 'rc-tween-one';
// const ErrorPage = () => {
//   const { token } = theme.useToken();
//   const [tags, setTags] = useState(['Tag 1', 'Tag 2', 'Tag 3']);
//   const [inputVisible, setInputVisible] = useState(false);
//   const [inputValue, setInputValue] = useState('');
//   const inputRef = useRef(null);
//   // useEffect(() => {
//   //   if (inputVisible) {
//   //     inputRef.current?.focus();
//   //   }
//   // }, [inputVisible]);
//   const handleClose = (removedTag) => {
//     const newTags = tags.filter((tag) => tag !== removedTag);
//     console.log(newTags);
//     setTags(newTags);
//   };
//   const showInput = () => {
//     setInputVisible(true);
//   };
//   const handleInputChange = (e) => {
//     setInputValue(e.target.value);
//   };
//   const handleInputConfirm = () => {
//     if (inputValue && tags.indexOf(inputValue) === -1) {
//       setTags([...tags, inputValue]);
//     }
//     setInputVisible(false);
//     setInputValue('');
//   };
//   const forMap = (tag) => (
//     <span
//       key={tag}
//       style={{
//         display: 'inline-block',
//       }}
//     >
//       <Tag
//         closable
//         onClose={(e) => {
//           // e.preventDefault();
//           handleClose(tag);
//         }}
//       >
//         {tag}
//       </Tag>
//     </span>
//   );
//   const tagChild = tags.map(forMap);
//   // const tagPlusStyle = {
//   //   background: token.colorBgContainer,
//   //   borderStyle: 'dashed',
//   // };
//   return (
//     <>
//       <div
//         style={{
//           marginBottom: 16,
//         }}
//       >
//         <TweenOneGroup
         
//           onEnd={(e) => {
//             if (e.type === 'appear' || e.type === 'enter') {
//               e.target.style = 'display: inline-block';
//             }
//           }}
//         >
//           {/* {tagChild} */}

//           <Tag
//         closable
        
//       >
//         {'tag'}
//       </Tag>

//       <Tag
//         closable
        
//       >
//         {'tag'}
//       </Tag>


//         </TweenOneGroup>
//       </div>
//       {
      
      
//       // inputVisible ? (
//         <Input
//           ref={inputRef}
//           type="text"
//           size="small"
//           style={{
//             width: 78,
//           }}
//           value={inputValue}
//           onChange={handleInputChange}
//           onBlur={handleInputConfirm}
//           onPressEnter={handleInputConfirm}
//         />
//       // ) : (
//       //   <Tag onClick={showInput} >
//       //     <PlusOutlined /> New Tag
//       //   </Tag>
//       // )
      
//       }
//     </>
//   );
// };


// export default ErrorPage
