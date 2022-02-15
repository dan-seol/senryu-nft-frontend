import { useSelector } from 'react-redux'
import React, { useRef, useEffect, useState } from 'react'
import p5 from 'p5'

export default function SenryuView(props) {
  const [stackId, setStackID] = useState(null)
  const { drizzle, drizzleState } = props
  
  const senryu = useSelector((state) => state.senryu.value)
  const processingRef = useRef()

  const setValue = value => {
    const contract = drizzle.contracts.SenryuNFT
    // let drizzle know we want to call the `set` method with `value`
    const metadata = {
      description: "a senryu nft minted",
      image: value
    }
    const stackId = contract.methods["mintNFT"].cacheSend(metadata, {
      from: drizzleState.accounts[0]
    })
    // save the `stackId` for later reference
    setStackID(stackId)

    alert(`NFT mint request pending for address ${drizzleState.accounts[0]}`)
  }

  const getTxStatus = () => {
    // get the transaction states from the drizzle state
    const { transactions, transactionStack } = drizzleState

    // get the transaction hash using our saved `stackId`
    const txHash = transactionStack[stackId]

    // if transaction hash does not exist, don't display anything
    if (!txHash) return null;

    // otherwise, return the transaction status
    return `Transaction status: ${transactions[txHash] && transactions[txHash].status}`
  }
  const Sketch = p => {
    p.setup = () => {
      p.createCanvas(1000, 400)
      p.textFont('Georgia')
      p.textSize(60);
      p.textAlign(p.CENTER, p.CENTER)
      p.button = p.createButton('click to mint');
      p.button.position(1374, 400);
      p.button.mousePressed(() => {
        setValue(p.canvas.toDataURL('image/png'))
      });

    }
    p.draw = () => {
      // get the contract state from drizzleState
      // using the saved `dataKey`, get the variable we're interested in
      // get the contract state from drizzleState
      //console.log(senryuObtained)

      //console.log(senryu)
      p.background(160);
      // Align the text in the center
      // and run drawWords() in the middle of the canvas
      p.textAlign(p.CENTER)
      p.fill(0)
      p.text(senryu.firstLine, p.width * 0.5, 80)
      p.fill(65)
      p.text(senryu.secondLine, p.width * 0.5, 150)
      p.fill(190)
      p.text(senryu.thirdLine, p.width * 0.5, 220)
      p.fill(255)
    }
    
  }
  useEffect(() => {
    let newp5 = new p5(Sketch, processingRef.current)
    return () => newp5.remove()
  }, [Sketch, senryu, drizzle, drizzleState, stackId])

  return <div>
    <div ref={processingRef} />
    <div>{getTxStatus()}</div>
    </div>
}