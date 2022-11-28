import React from 'react'
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button,Form } from 'react-bootstrap';
import axios from 'axios'
function starRading() {
  return (
        <div>
            <p className="m-0 mr-2">1. Đánh giá của bạn về sản phẩm này:</p>
            <div className="rate">
              <Form.Control type="radio" id="star1" name="rate" defaultValue={1} />
              <label htmlFor="star1" title="text" />
              <Form.Control type="radio" id="star2" name="rate" defaultValue={2} />
              <label htmlFor="star2" title="text" />
              <Form.Control type="radio" id="star3" name="rate" defaultValue={3} />
              <label htmlFor="star3" title="text" />
              <Form.Control type="radio" id="star4" name="rate" defaultValue={4} />
              <label htmlFor="star4" title="text" />
              <Form.Control type="radio" id="star5" name="rate" defaultValue={5} />
              <label htmlFor="star5" title="text" />
            </div>
          </div>
  )
}

export default starRading