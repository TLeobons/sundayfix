import { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import Loader from 'react-loader-spinner'
import Modal from 'react-modal'
import { motion } from 'framer-motion'
import moment from 'moment'
import DatePicker from 'react-datepicker'
import Dropdown from 'react-dropdown'

import Heading from 'components/Heading'
import Sidebar from 'components/Sidebar'
import SidebarCard from 'components/SidebarCard'
import { TripContext } from 'contexts/TripContext'
import { api } from 'services/httpService'

import { device } from 'style/responsive'
import { ReactComponent as Check } from 'assets/Check.svg'
import 'react-dropdown/style.css'
import 'react-datepicker/dist/react-datepicker.css'

const NewTrip = () => {

  const [state, dispatch] = useContext(TripContext)
  const xValues = [5000, -40, 0]
  const [modalIsOpen, setIsOpen] = useState(false)
  const [endDateMin, setEndDateMin] = useState(moment().toDate())
  const [endDateVal, setEndDateVal] = useState('')
  
  const addNewTrip = async () => {
    let resp
    try {
      resp = await api.post('/trip', state.form)
      dispatch({ type: 'ADD_TRIP', payload: { ...state.form, id: resp.data.id } })
      await setIsOpen(true)
    } catch (e) {
      console.error(e)
    }
  }

  const customStyles = {
    content: {
      top: '45%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      width: '500px',
    },
  }

  useEffect(() => {
    dispatch({ type: 'SET_INITIAL' })
  }, [dispatch])

  let startDate =
    state.form.start_date !== ''
      ? moment(state.form.start_date, 'YYYY-MM-DD').toDate()
      : ''

  return (
    <Container>
      <Main>
        <Heading title="New trip" />
        <Modal
          isOpen={modalIsOpen}
          style={customStyles}
          onRequestClose={()=>setIsOpen(false)}
        >
          <Form
            initial={{ opacity: 0, scale: 0.75 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
          >
            <Label htmlFor="q" style={{ textAlign: 'center' }}>
              Data Uploaded Successfully
            </Label>
            <FormButtonGroup>
              <Link to="/">
                <AcceptDeleteButton
                  whileHover={{
                    scale: 1.15,
                    translateY: -10,
                    boxShadow: '3px 3px 5px rgba(0,0,0,0.3)',
                  }}
                >
                  OK
                </AcceptDeleteButton>
              </Link>
            </FormButtonGroup>
          </Form>
        </Modal>
        <Form>
          <FormContent>
            <InnerForm>
              <FormGroup>
                <DPDown animate={{ x: xValues }} transition={{ duration: 1 }}>
                  <Label htmlFor="countries">Where do you want to go</Label>
                  <Dropdown
                    required
                    className={state.selectedCountry}
                    id="country"
                    name="country"
                    options={state.countries}
                    placeholder="Select country"
                    onChange={data => {
                      dispatch({
                        type: 'SET_SELECTED_COUNTRY',
                        payload: data.value,
                      })
                    }}
                  />
                </DPDown>
              </FormGroup>

              <FormGroup>
                <FormInnerGroup
                  animate={{ x: xValues, opacity: [0, 0.3, 1] }}
                  transition={{ duration: 1, delay: 0.1 }}
                >
                  <Label htmlFor="startDate">Start date</Label>
                  <DatePickerWrap>
                    <DatePicker
                      required
                      selected={startDate}
                      onChange={(date) => {
                        let nextDay = moment(date).add(1, 'day').toDate();
                        setEndDateMin(nextDay)
                        if (moment(state.form.end_date) <= moment(date)) {
                          setEndDateVal('');
                          dispatch({
                            type: 'SET_EndDate',
                            payload: {
                              end_date: '',
                            },
                          })
                        }
                        dispatch({
                          type: 'SET_StartDate',
                          payload: {
                            start_date: moment(date).format('YYYY-MM-DD'),
                          },
                        })
                      }}
                      date
                      id="startDate"
                      name="startDate"
                      placeholderText="dd. mm. year"
                      showPopperArrow={false}
                      selectsStart
                      showMonthYearDropdown
                      dateFormat="dd. MM. yyyy"
                      minDate={moment().toDate()}
                    />
                  </DatePickerWrap>
                </FormInnerGroup>

                <FormInnerGroup
                  animate={{ x: xValues }}
                  transition={{ duration: 1, delay: 0.2 }}
                >
                  <Label htmlFor="endDate">End date</Label>
                  <DatePickerWrap>
                    <DatePicker
                      required
                      selected={endDateVal}
                      onChange={date => {
                        setEndDateVal(moment(date).toDate())
                        dispatch({
                      type: 'SET_EndDate',
                          payload: {
                      end_date: moment(date).format('YYYY-MM-DD'),
                          },
                        })
                      }}
                      id="endDate"
                      name="endDate"
                      placeholderText="dd. mm. year"
                      dateFormat="dd. MM. yyyy"
                      minDate={endDateMin}
                      showTwoColumnMonthYearPicker
                      showPopperArrow={false}
                    />
                  </DatePickerWrap>
                </FormInnerGroup>
              </FormGroup>

              <FormGroup>
                <FormInnerGroup
                  animate={{ x: xValues }}
                  transition={{ duration: 1, delay: 0.3 }}
                >
                  <Label htmlFor="company">Company name</Label>
                  <Input
                    required
                    id="company"
                    name="company"
                    placeholder="Type here..."
                    onChange={e => {
                      dispatch({
                        type: 'SET_CompanyName',
                        payload: {
                          company_name: e.target.value,
                        },
                      })
                    }}
                  />
                </FormInnerGroup>

                <FormInnerGroup
                  animate={{ x: xValues }}
                  transition={{ duration: 1, delay: 0.4 }}
                >
                  <Label htmlFor="city">City</Label>
                  <Input
                    required
                    id="city"
                    name="city"
                    placeholder="Type here..."
                    onChange={e => {
                      dispatch({
                        type: 'SET_CITY',
                        payload: {
                          address: {
                            city: e.target.value,
                          },
                        },
                      })
                    }}
                  />
                </FormInnerGroup>

                <FormInnerGroup
                  animate={{ x: xValues }}
                  transition={{ duration: 1, delay: 0.5 }}
                >
                  <Label htmlFor="street">Street</Label>
                  <Input
                    required
                    id="street"
                    name="street"
                    placeholder="Type here..."
                    onChange={e => {
                      dispatch({
                        type: 'SET_Street',
                        payload: {
                          address: {
                            street: e.target.value,
                          },
                        },
                      })
                    }}
                  />
                </FormInnerGroup>

                <FormInnerGroup
                  animate={{ x: xValues }}
                  transition={{ duration: 1, delay: 0.6 }}
                >
                  <Label htmlFor="streetNumber">Street Number</Label>
                  <Input
                    required
                    id="streetNumber"
                    name="streetNumber"
                    type="number" //remove this line when back-end allows strings for this field
                    placeholder="Type here..."
                    onChange={e => {
                      dispatch({
                        type: 'SET_StreetNumber',
                        payload: {
                          address: {
                            street_num: Number(e.target.value),
                          },
                        },
                      })
                    }}
                  />
                </FormInnerGroup>

                <FormInnerGroup
                  animate={{ x: xValues }}
                  transition={{ duration: 1, delay: 0.7 }}
                >
                  <Label htmlFor="zipCode">Zip code</Label>
                  <Input
                    id="zipCode"
                    name="zipCode"
                    placeholder="Type here..."
                    onChange={e => {
                      dispatch({
                        type: 'SET_ZIP',
                        payload: {
                          address: {
                            zip: e.target.value,
                          },
                        },
                      })
                    }}
                  />
                </FormInnerGroup>
              </FormGroup>

              <FormGroup>
                <LabelQuestion>
                  Have you been recently tested for <strong>COVID-19</strong>
                </LabelQuestion>

                <RadioButtonGroup
                  animate={{ x: xValues }}
                  transition={{ duration: 1, delay: 0.8 }}
                >
                  <RadioButton>
                    <input
                      required
                      type="radio"
                      name="testedCovid"
                      id="yes"
                      value="0"
                      onChange={() => {
                        dispatch({
                          type: 'SET_Covid',
                          payload: {
                            covid: true,
                          },
                        })
                      }}
                    />
                    <div />
                    <span>Yes</span>
                  </RadioButton>

                  <RadioButton>
                    <input
                      required
                      type="radio"
                      name="testedCovid"
                      id="no"
                      value="1"
                      onChange={() => {
                        dispatch({
                          type: 'SET_Covid',
                          payload: {
                            covid: false,
                          },
                        })
                      }}
                    />
                    <div />
                    <span>No</span>
                  </RadioButton>
                </RadioButtonGroup>
              </FormGroup>
            </InnerForm>
          </FormContent>

          <FormFooter>
            <Button type="button" onClick={() => addNewTrip()}>
              Save
              <Check width={16} height={12} />
            </Button>
          </FormFooter>
        </Form>
      </Main>
      <Sidebar sidebarHeading="Trips">
        {state?.trips.length === 0
              ? (state?.tripsInStore === true ? <NoTrips>No trips registered yet</NoTrips> : <StyledLoader type="BallTriangle" color="var(--accent)" />) : (
              state?.trips.map(trip => <SidebarCard
                key={trip.id}
                country={trip.address.country}
                company={trip.company_name}
                address={`${trip.address.street} ${trip.address.street_num} ${trip.address.zip} ${trip.address.city}`}
                date={`${moment(trip.start_date).format('D MMM')} - ${moment(
                  trip.end_date,
                ).format('D MMM, YYYY')}`}
                id={trip.id}
              />
              ))
          }
      </Sidebar>
    </Container>
  )
}

export default NewTrip

const DPDown = styled(motion.div)``

const NoTrips = styled(motion.div)`
  text-align: center;
  margin: 4rem;
  font-size: 3rem;
  color: var(--dark-grey)
`

const FormButtonGroup = styled.div`
  flex-direction: row;
`
const AcceptDeleteButton = styled(motion.div)`
  background: red;
  font-size: 1.6rem;
  padding: 1.3rem 2rem;
  margin: 1.2rem;
  max-width: 200px;
  border-radius: 10px;
  font-weight: 600;
  text-align: left;
  display: inline-block;
  align-items: center;
  cursor: pointer;
  color: white;

  > svg {
    margin-left: auto;
  }
`
const StyledLoader = styled(Loader)`
  display: flex;
  justify-content: center;
  margin: 50px;
`

const Container = styled.div`
  display: flex;
  justify-content: center;
  flex: 1;
  width: 100%;
  height: 100vh;
`

const Main = styled.main`
  display: flex;
  flex-direction: column;
  flex: 1;
  align-items: center;
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  width: 100%;
  align-items: center;
`

const FormContent = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  width: 100%;
  align-items: center;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 10px;
  }

  &::-webkit-scrollbar-track {
    background: white;
  }

  &::-webkit-scrollbar-thumb {
    background: #ccc;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`

const DatePickerWrap = styled.div`
  position: relative;
  flex: 1;
  width: 100%;
`

const InnerForm = styled.div`
  width: 100%;
  flex: 1;
  max-width: 500px;
  padding: 5rem 0;

  @media ${device.tablet} {
    padding: 2rem;
  }
`

const FormGroup = styled.div`
  background-color: var(--grey);
  display: flex;
  flex-direction: column;
  padding: 2rem;
  border-radius: 5px;
  margin-bottom: 1.5rem;

  strong {
    font-weight: bold;
  }
`

const FormInnerGroup = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;

  background: #f9f9fa;
  border-radius: 10px;

  margin-top: 2rem;
  width: 100%;

  &:first-child {
    margin-top: 0;
  }
`

const Label = styled.label`
  display: block;
  font-size: 1.4rem;
  margin-bottom: 2rem;
  color: black;
  display: block;
  width: 100%;
`

const LabelQuestion = styled(motion.label)`
  display: block;
  font-size: 1.4rem;
  color: black;
  display: block;
  width: 100%;

  strong {
    font-weight: 600;
  }

  @media ${device.tablet} {
    font-size: 1.2rem;
  }
`

const Input = styled.input`
  padding: 1.3rem 1.6rem;
  border-radius: 10px;
  border: none;
  font-size: 1.6rem;
  border: 1px solid #f1f1f2;
  outline: 0;
  display: block;
  width: 100%;
  font-size: 1.4rem;
  line-height: 2rem;

  &::placeholder {
    color: #d0d0ce;
  }

  &:focus {
    border: 1px solid #ccc;
  }

  &.react-datepicker-ignore-onclickoutside {
    border-radius: 10px 10px 0 0 !important;
  }
`

const RadioButtonGroup = styled(motion.div)`
  display: flex;
  margin-top: 2rem;
`

const RadioButton = styled.label`
  position: relative;
  padding: 1rem 2rem;
  border-radius: 10px;
  background: #f1f1f2;
  color: #76787b;
  font-weight: 600;
  margin-right: 1rem;
  padding-left: 3.5rem;
  font-size: 1.6rem;
  line-height: 2rem;

  > input {
    opacity: 0;
    visibility: hidden;
    position: absolute;
  }

  > div {
    content: '';
    display: block;
    width: 16px;
    height: 16px;
    border-radius: 16px;
    border: 1px solid #d6d6d3;
    background: white;
    position: absolute;
    left: 10px;
    top: 50%;
    margin-top: -8px;
  }

  > div:before {
    content: '';
    display: block;
    width: 8px;
    height: 8px;
    border-radius: 10px;
    background: black;
    position: absolute;
    left: 3px;
    top: 3px;
    transform: scale(0);
    transition: transform 0.15s;
  }

  > input:checked ~ div:before {
    transform: scale(1);
  }
`

const FormFooter = styled.div`
  width: 100%;
  border-top: 1px solid #f1f1f2;
  padding: 2rem 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Button = styled.button`
  background: var(--accent);
  font-size: 1.6rem;
  padding: 1.3rem 2rem;
  flex: 1;
  max-width: 200px;
  border-radius: 10px;
  font-weight: 600;
  text-align: left;
  display: flex;
  align-items: center;

  > svg {
    margin-left: auto;
  }
`
