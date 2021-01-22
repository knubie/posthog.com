import React from 'react'
import Modal from 'react-modal'
import { Spacer } from '../Spacer'
import Markdown from 'react-markdown'
import { Button, Spin } from 'antd'
import { ExportOutlined } from '@ant-design/icons'
import { useActions, useValues } from 'kea'
import { pluginLibraryLogic } from '../../logic/pluginLibraryLogic'

export const PluginModal = () => {
    const { activePlugin, activePluginName, pluginLoading } = useValues(pluginLibraryLogic)
    const { setOpenPlugin } = useActions(pluginLibraryLogic)

    return (
        <Modal
            isOpen={!!activePluginName}
            onRequestClose={() => setOpenPlugin('')}
            className="pluginModalContent"
            overlayClassName="modalOverlay"
            ariaHideApp={false}
        >
            {pluginLoading ? (
                <Spin size="large" className="centered-spin" />
            ) : (
                <>
                    <div>
                        <Spacer />
                        <img src={activePlugin.imageSrc} />
                        <Markdown source={activePlugin.markdown} linkTarget="_blank" />
                        <Spacer />
                        <a className="centered" href={activePlugin.url} target="_blank" rel="noreferrer">
                            Learn More <ExportOutlined />
                        </a>
                    </div>
                    <Button icon="close" onClick={() => setOpenPlugin('')} className="modalClose" />
                </>
            )}
        </Modal>
    )
}
