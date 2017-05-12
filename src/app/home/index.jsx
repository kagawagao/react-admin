import React from 'react'
// import { Link } from 'react-router-dom'
import 'styles/app/home/index.less'
import Row from 'nd-components-rc/src/row'
import Col from 'nd-components-rc/src/col'
import Input from 'nd-components-rc/src/input'
import Button, { ButtonGroup } from 'nd-components-rc/src/button'
import Breadcrumb, { BreadcrumbItem } from 'nd-components-rc/src/breadcrumb'
import Menu, { MenuItem } from 'nd-components-rc/src/menu'
import Select, { Option } from 'nd-components-rc/src/select'
import Icon from 'nd-components-rc/src/icon'
import iconfont from 'nd-components-rc/src/icon/icons.json'
import autobind from 'autobind-decorator'

const { icons } = iconfont

export default class Home extends React.Component {
  @autobind
  handleBtnClick (e) {
    console.log(e)
  }

  @autobind
  handleInputChange (e) {
    console.log(e.target.value)
  }

  @autobind
  handleBcClick (e, index) {
    console.log(e)
    console.log(index)
  }

  @autobind
  handleBcItemClick (e) {
    console.log(e)
  }

  render () {
    return (
      <div className="home">
        <h1>栅格系统</h1>
        <div className="columns">
          <Row>
            <Col span={24} className="cols">span-24</Col>
          </Row>
          <Row>
            <Col span={12} className="cols">span-12</Col>
            <Col span={12} className="cols">span-12</Col>
          </Row>
          <Row>
            <Col span={4} className="cols">span-4</Col>
            <Col span={4} className="cols">span-4</Col>
            <Col span={6} className="cols">span-6</Col>
            <Col span={8} className="cols">span-8</Col>
          </Row>
          <Row>
            <Col span={4} className="cols">span-4</Col>
          </Row>
          <Row>
            <Col span={8} offset={10} className="cols">span-8 offset-10</Col>
          </Row>
          <Row>
            <Col span={12} offset={12} className="cols">span-12 offset-12</Col>
          </Row>
        </div>
        <h2>Button</h2>
        <div className="buttons">
          <Button onClick={this.handleBtnClick}>Default</Button>
          <Button onClick={this.handleBtnClick} primary>Primary</Button>
          <Button onClick={this.handleBtnClick} large>large</Button>
          <Button onClick={this.handleBtnClick} circle large>circle</Button>
          <Button onClick={this.handleBtnClick} small>small</Button>
          <Button onClick={this.handleBtnClick} disabled dashed>disabled</Button>
          <Button onClick={this.handleBtnClick} disabled primary>disabled</Button>
          <ButtonGroup>
            <Button onClick={this.handleBtnClick}>primary</Button>
            <Button onClick={this.handleBtnClick} danger>danger</Button>
            <Button onClick={this.handleBtnClick} dashed>dashed</Button>
            <Button onClick={this.handleBtnClick} disabled>disabled</Button>
          </ButtonGroup>
        </div>
        <h1>Input</h1>
        <Row>
          <Input placeholder="placeholder" />
          <Input placeholder="placeholder" defaultValue="default" />
          <Input placeholder="disabled" disabled />
        </Row>
        <Row>
          <Input placeholder="large" large />
          <Input placeholder="default" />
          <Input placeholder="small" small />
        </Row>
        <Row>
          <Col span={6}>
            <Input addons={{ before: 'http://' }} />
          </Col>
          <Col span={6} offset={2}>
            <Input addons={{ after: '.com' }} />
          </Col>
          <Col span={6} offset={4}>
            <Input addons={{ before: 'http://', after: '.com' }} />
          </Col>
        </Row>
        <Row>
          <Col span={4}>
            <Input placeholder="number" defaultValue="default" type="number" />
          </Col>
          <Col span={4} offset={2}>
            <Input placeholder="placeholder" defaultValue="default" onChange={this.handleInputChange} />
          </Col>
          <Col span={4} offset={4}>
            <Input placeholder="placeholder" defaultValue="error" onChange={this.handleInputChange} error />
          </Col>
        </Row>
        <h1>Breadcrumb</h1>
        <Breadcrumb onClick={this.handleBcClick}>
          <BreadcrumbItem>Home</BreadcrumbItem>
          <BreadcrumbItem>Parent</BreadcrumbItem>
          <BreadcrumbItem>Child</BreadcrumbItem>
        </Breadcrumb>
        <Breadcrumb separator=">">
          <BreadcrumbItem onClick={this.handleBcItemClick}>Home</BreadcrumbItem>
          <BreadcrumbItem onClick={this.handleBcItemClick}>Parent</BreadcrumbItem>
          <BreadcrumbItem onClick={this.handleBcItemClick}>Child</BreadcrumbItem>
        </Breadcrumb>
        <h1>Menu</h1>
        <Row>
          <Menu>
            <MenuItem>Menu Item 1</MenuItem>
            <MenuItem>Menu Item 2</MenuItem>
            <MenuItem>Menu Item 3</MenuItem>
            <MenuItem>Menu Item 4</MenuItem>
          </Menu>
        </Row>
        <h1>Select</h1>
        <Row>
          <Select value={111} placeholder="Please select">
            <Option value={111}>111</Option>
            <Option value={112}>112</Option>
            <Option value={113}>113</Option>
            <Option value={114}>114</Option>
            <Option value={115}>115</Option>
            <Option value={116}>116</Option>
            <Option value={117}>117</Option>
            <Option value={118}>118</Option>
            <Option value={119}>119</Option>
            <Option value={22222222}>22222222</Option>
            <Option value={333}><span>333</span></Option>
            <Option value={444}>
              <span><span>444</span></span>
            </Option>
          </Select>
          <Select value={111} placeholder="Please select" multi>
            <Option value={111}>111</Option>
            <Option value={112}>112</Option>
            <Option value={113}>113</Option>
            <Option value={114}>114</Option>
            <Option value={115}>115</Option>
            <Option value={116}>116</Option>
            <Option value={117}>117</Option>
            <Option value={118}>118</Option>
            <Option value={119}>119</Option>
            <Option value={22222222}>22222222</Option>
            <Option value={333}><span>333</span></Option>
            <Option value={444}>
              <span><span>444</span></span>
            </Option>
          </Select>
        </Row>
        <h1>Icon</h1>
        <ul className="icons">
          {icons.map((icon, index) => {
            const { name, order } = icon
            return (
              <li tabIndex="0" key={`${index}-${order}`}>
                <Icon icon={name.split(',')[0]} />
                <span>{name.split(',')[0]}</span>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }
}
