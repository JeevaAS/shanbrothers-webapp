"""Backend API tests for Shan Brothers Manpower Consultants."""
import os
import pytest
import requests

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', 'https://manpower-asia.preview.emergentagent.com').rstrip('/')
API = f"{BASE_URL}/api"
ADMIN_EMAIL = "admin@shanbrothers.sg"
ADMIN_PASSWORD = "ShanAdmin@2025"


@pytest.fixture(scope="session")
def s():
    return requests.Session()


@pytest.fixture(scope="session")
def token(s):
    r = s.post(f"{API}/auth/login", json={"email": ADMIN_EMAIL, "password": ADMIN_PASSWORD})
    assert r.status_code == 200, r.text
    return r.json()["access_token"]


@pytest.fixture(scope="session")
def auth_headers(token):
    return {"Authorization": f"Bearer {token}"}


# ---------- Health ----------
def test_health(s):
    r = s.get(f"{API}/health")
    assert r.status_code == 200
    assert r.json()["status"] == "healthy"


# ---------- Public: Candidates ----------
_created = {}


def test_create_candidate_valid(s):
    payload = {
        "full_name": "TEST_Ravi Kumar",
        "email": "test_ravi@example.com",
        "phone": "+919812345678",
        "country": "India",
        "trade": "Welder",
        "experience_years": 5,
        "passport_available": True,
        "resume_url": "https://example.com/cv.pdf",
        "message": "Available immediately",
    }
    r = s.post(f"{API}/candidates", json=payload)
    assert r.status_code == 201, r.text
    d = r.json()
    assert d["email"] == payload["email"]
    assert d["status"] == "new"
    assert d["id"] and d["created_at"]
    _created["candidate_id"] = d["id"]


def test_create_candidate_invalid_missing_email(s):
    r = s.post(f"{API}/candidates", json={
        "full_name": "TEST_NoEmail", "phone": "+911234567890",
        "country": "India", "trade": "Driver", "experience_years": 3,
    })
    assert r.status_code == 422


def test_create_candidate_invalid_negative_exp(s):
    r = s.post(f"{API}/candidates", json={
        "full_name": "TEST_Neg", "email": "n@e.com", "phone": "+911234567890",
        "country": "India", "trade": "Driver", "experience_years": -2,
    })
    assert r.status_code == 422


# ---------- Public: Employers ----------
def test_create_employer_valid(s):
    payload = {
        "company_name": "TEST_Acme Construction",
        "contact_person": "John Tan",
        "email": "test_john@acme.sg",
        "phone": "+6591234567",
        "country": "Singapore",
        "workers_needed": 20,
        "trade_needed": "Welders, Electricians",
        "deployment_timeline": "1-3 months",
        "message": "Need urgently",
    }
    r = s.post(f"{API}/employers", json=payload)
    assert r.status_code == 201, r.text
    d = r.json()
    assert d["company_name"] == payload["company_name"]
    assert d["status"] == "new"
    _created["employer_id"] = d["id"]


# ---------- Public: Contacts ----------
def test_create_contact_valid(s):
    payload = {
        "name": "TEST_Contact",
        "email": "test_contact@example.com",
        "phone": "+6598765432",
        "subject": "General enquiry",
        "message": "Please share brochure",
    }
    r = s.post(f"{API}/contacts", json=payload)
    assert r.status_code == 201, r.text
    d = r.json()
    assert d["email"] == payload["email"]
    assert d["status"] == "new"
    _created["contact_id"] = d["id"]


# ---------- Auth ----------
def test_login_success(s):
    r = s.post(f"{API}/auth/login", json={"email": ADMIN_EMAIL, "password": ADMIN_PASSWORD})
    assert r.status_code == 200
    j = r.json()
    assert "access_token" in j
    assert j["user"]["email"] == ADMIN_EMAIL
    assert j["user"]["role"] == "admin"


def test_login_wrong_password(s):
    r = s.post(f"{API}/auth/login", json={"email": ADMIN_EMAIL, "password": "wrong"})
    assert r.status_code == 401


def test_me(s, auth_headers):
    r = s.get(f"{API}/auth/me", headers=auth_headers)
    assert r.status_code == 200
    assert r.json()["email"] == ADMIN_EMAIL


def test_admin_candidates_no_token(s):
    r = s.get(f"{API}/admin/candidates")
    assert r.status_code == 401


# ---------- Admin lists ----------
def test_admin_list_candidates(s, auth_headers):
    r = s.get(f"{API}/admin/candidates", headers=auth_headers)
    assert r.status_code == 200
    ids = [c["id"] for c in r.json()]
    assert _created["candidate_id"] in ids


def test_admin_list_employers(s, auth_headers):
    r = s.get(f"{API}/admin/employers", headers=auth_headers)
    assert r.status_code == 200
    ids = [c["id"] for c in r.json()]
    assert _created["employer_id"] in ids


def test_admin_list_contacts(s, auth_headers):
    r = s.get(f"{API}/admin/contacts", headers=auth_headers)
    assert r.status_code == 200
    ids = [c["id"] for c in r.json()]
    assert _created["contact_id"] in ids


# ---------- PATCH status ----------
def test_patch_candidate_status(s, auth_headers):
    cid = _created["candidate_id"]
    r = s.patch(f"{API}/admin/candidates/{cid}", json={"status": "contacted"}, headers=auth_headers)
    assert r.status_code == 200
    assert r.json()["status"] == "contacted"


def test_patch_candidate_invalid_status(s, auth_headers):
    cid = _created["candidate_id"]
    r = s.patch(f"{API}/admin/candidates/{cid}", json={"status": "bogus"}, headers=auth_headers)
    assert r.status_code == 400


def test_patch_employer_status(s, auth_headers):
    eid = _created["employer_id"]
    r = s.patch(f"{API}/admin/employers/{eid}", json={"status": "in_progress"}, headers=auth_headers)
    assert r.status_code == 200
    assert r.json()["status"] == "in_progress"


def test_patch_contact_status(s, auth_headers):
    cid = _created["contact_id"]
    r = s.patch(f"{API}/admin/contacts/{cid}", json={"status": "read"}, headers=auth_headers)
    assert r.status_code == 200
    assert r.json()["status"] == "read"


# ---------- Stats ----------
def test_admin_stats(s, auth_headers):
    r = s.get(f"{API}/admin/stats", headers=auth_headers)
    assert r.status_code == 200
    d = r.json()
    for k in ("candidates", "employers", "contacts"):
        assert "total" in d[k] and "new" in d[k]


# ---------- Delete (cleanup) ----------
def test_delete_candidate(s, auth_headers):
    cid = _created["candidate_id"]
    r = s.delete(f"{API}/admin/candidates/{cid}", headers=auth_headers)
    assert r.status_code == 200
    # Verify gone
    r2 = s.get(f"{API}/admin/candidates", headers=auth_headers)
    assert cid not in [c["id"] for c in r2.json()]


def test_delete_employer(s, auth_headers):
    eid = _created["employer_id"]
    r = s.delete(f"{API}/admin/employers/{eid}", headers=auth_headers)
    assert r.status_code == 200


def test_delete_contact(s, auth_headers):
    cid = _created["contact_id"]
    r = s.delete(f"{API}/admin/contacts/{cid}", headers=auth_headers)
    assert r.status_code == 200
