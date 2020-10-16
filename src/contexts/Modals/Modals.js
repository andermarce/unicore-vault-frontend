import React, { createContext, useCallback, useState } from 'react'
import { Dialog } from '@material-ui/core'

export const ModalsContext = createContext({
  onDismiss: () => {},
  onPresent: () => {}
})

const ModalsProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState();

  const handlePresent = useCallback((modalContent) => {
    setContent(modalContent)
    setIsOpen(true)
  }, [setContent, setIsOpen])

  const handleDismiss = useCallback(() => {
    //setContent(undefined)
    setIsOpen(false)
  }, [setIsOpen])


  return (
    <ModalsContext.Provider value={{
      onDismiss: handleDismiss,
      onPresent: handlePresent
    }}>
      {children}
      <Dialog open={isOpen} onClose={handleDismiss}>
        {React.isValidElement(content) && React.cloneElement(content, {
          onDismiss: handleDismiss
        })}
      </Dialog>
      {/* <Modal
        open={isOpen}
        onClose={handleDismiss}
        closeAfterTransition
        BackdropComponent={Backdrop}
        // BackdropProps={{
        //   timeout: 500,
        // }}
        style={{
          outline:0
        }}
      >
        <Fade in={isOpen}>
          <Box
            height="100%"
            width="100%"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Paper>
              <Box p={4}>
                {content}
              </Box>

            </Paper>
            
          </Box>
        </Fade>
      </Modal> */}
    </ModalsContext.Provider>
  )
}

export default ModalsProvider;