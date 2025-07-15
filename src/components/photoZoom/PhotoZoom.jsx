import React, { useState, useRef, useEffect } from 'react';
import { IoClose } from 'react-icons/io5';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import './PhotoZoom.css'; 

const PhotoZoom = ({ product, selectedImage, setSelectedImage }) => {
  const [isZoomOpen, setIsZoomOpen] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const imageRef = useRef(null);
  const containerRef = useRef(null);

  // Tüm resimleri topla
  const allImages = [
    product.image,
    product.imageHoverOne,
    product.imageHoverTwo,
    product.imageHoverThree
  ].filter(Boolean);

  const currentImageIndex = allImages.indexOf(selectedImage);

  // Zoom modalını aç
  const openZoom = () => {
    setIsZoomOpen(true);
    setZoomLevel(1);
    setPosition({ x: 0, y: 0 });
    document.body.style.overflow = 'hidden';
  };

  // Zoom modalını kapat
  const closeZoom = () => {
    setIsZoomOpen(false);
    setZoomLevel(1);
    setPosition({ x: 0, y: 0 });
    document.body.style.overflow = '';
  };

  // Zoom in/out
  const handleZoom = (delta, clientX, clientY) => {
    const newZoomLevel = Math.max(1, Math.min(4, zoomLevel + delta));
    
    if (newZoomLevel === 1) {
      setPosition({ x: 0, y: 0 });
    } else if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = clientX - rect.left;
      const centerY = clientY - rect.top;
      
      const scaleFactor = newZoomLevel / zoomLevel;
      setPosition({
        x: (position.x - centerX) * scaleFactor + centerX,
        y: (position.y - centerY) * scaleFactor + centerY
      });
    }
    
    setZoomLevel(newZoomLevel);
  };

  // Mouse wheel zoom
  const handleWheel = (e) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.2 : 0.2;
    handleZoom(delta, e.clientX, e.clientY);
  };

  // Touch zoom (pinch)
  const handleTouchStart = (e) => {
    if (e.touches.length === 2) {
      const touch1 = e.touches[0];
      const touch2 = e.touches[1];
      const distance = Math.sqrt(
        Math.pow(touch2.clientX - touch1.clientX, 2) + 
        Math.pow(touch2.clientY - touch1.clientY, 2)
      );
      setDragStart({ distance });
    }
  };

  const handleTouchMove = (e) => {
    if (e.touches.length === 2 && dragStart.distance) {
      e.preventDefault();
      const touch1 = e.touches[0];
      const touch2 = e.touches[1];
      const distance = Math.sqrt(
        Math.pow(touch2.clientX - touch1.clientX, 2) + 
        Math.pow(touch2.clientY - touch1.clientY, 2)
      );
      
      const scale = distance / dragStart.distance;
      const newZoomLevel = Math.max(1, Math.min(4, zoomLevel * scale));
      setZoomLevel(newZoomLevel);
      setDragStart({ distance });
    }
  };

  // Mouse drag
  const handleMouseDown = (e) => {
    if (zoomLevel > 1) {
      setIsDragging(true);
      setDragStart({
        x: e.clientX - position.x,
        y: e.clientY - position.y
      });
    }
  };

  const handleMouseMove = (e) => {
    if (isDragging && zoomLevel > 1) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Resim değiştirme
  const nextImage = () => {
    const nextIndex = (currentImageIndex + 1) % allImages.length;
    setSelectedImage(allImages[nextIndex]);
    setZoomLevel(1);
    setPosition({ x: 0, y: 0 });
  };

  const prevImage = () => {
    const prevIndex = currentImageIndex === 0 ? allImages.length - 1 : currentImageIndex - 1;
    setSelectedImage(allImages[prevIndex]);
    setZoomLevel(1);
    setPosition({ x: 0, y: 0 });
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isZoomOpen) return;
      
      switch (e.key) {
        case 'Escape':
          closeZoom();
          break;
        case 'ArrowLeft':
          prevImage();
          break;
        case 'ArrowRight':
          nextImage();
          break;
        case '+':
        case '=':
          handleZoom(0.2, window.innerWidth / 2, window.innerHeight / 2);
          break;
        case '-':
          handleZoom(-0.2, window.innerWidth / 2, window.innerHeight / 2);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isZoomOpen, zoomLevel, position]);

  return (
    <>
 
      <div className="product-left-image" onClick={openZoom}>
        <img src={selectedImage} alt={product.name} />
        <div className="zoom-hint">🔍 Click to zoom</div>
      </div>

      {/* Zoom Modal */}
      {isZoomOpen && (
        <div className="zoom-modal">
          <div className="zoom-overlay" onClick={closeZoom}></div>
          
     
          <div className="zoom-controls">
            <button className="zoom-close" onClick={closeZoom}>
              <IoClose />
            </button>
            <button className="zoom-in" onClick={() => handleZoom(0.2, window.innerWidth / 2, window.innerHeight / 2)}>
              +
            </button>
            <button className="zoom-out" onClick={() => handleZoom(-0.2, window.innerWidth / 2, window.innerHeight / 2)}>
              -
            </button>
            <span className="zoom-level">{Math.round(zoomLevel * 100)}%</span>
          </div>

  
          <div 
            ref={containerRef}
            className="zoom-container"
            onWheel={handleWheel}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
          >
            <img
              ref={imageRef}
              src={selectedImage}
              alt={product.name}
              className="zoom-image"
              style={{
                transform: `scale(${zoomLevel}) translate(${position.x / zoomLevel}px, ${position.y / zoomLevel}px)`,
                cursor: zoomLevel > 1 ? (isDragging ? 'grabbing' : 'grab') : 'zoom-in'
              }}
              draggable={false}
            />
          </div>

          {/* Resim navigasyonu */}
          {allImages.length > 1 && (
            <>
              <button className="zoom-nav zoom-prev" onClick={prevImage}>
                <IoIosArrowBack />
              </button>
              <button className="zoom-nav zoom-next" onClick={nextImage}>
                <IoIosArrowForward />
              </button>
            </>
          )}

  
          <div className="zoom-thumbnails">
            {allImages.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Thumbnail ${index + 1}`}
                className={`zoom-thumbnail ${img === selectedImage ? 'active' : ''}`}
                onClick={() => {
                  setSelectedImage(img);
                  setZoomLevel(1);
                  setPosition({ x: 0, y: 0 });
                }}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default PhotoZoom;